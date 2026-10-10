import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Property } from "../data/properties";
import { supabase } from "../lib/supabase";

type DatabaseProperty = Property & {
  is_deleted: boolean;
  created_at?: string;
  updated_at?: string;
};

type PropertyContextType = {
  properties: Property[];
  deletedProperties: Property[];
  addProperty: (property: Property) => void;
  updateProperty: (updatedProperty: Property) => Promise<void>;
  deleteProperty: (id: number) => Promise<void>;
  restoreProperty: (id: number) => Promise<void>;
  refreshProperties: () => Promise<void>;
  hasLoaded: boolean;
};

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined,
);

type PropertyProviderProps = {
  children: ReactNode;
};

function removeDatabaseFields(row: DatabaseProperty): Property {
  const {
    is_deleted: _isDeleted,
    created_at: _createdAt,
    updated_at: _updatedAt,
    ...property
  } = row;
  return property;
}

function PropertyProvider({ children }: PropertyProviderProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [deletedProperties, setDeletedProperties] = useState<Property[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadProperties = useCallback(async () => {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      const rows = (data ?? []) as DatabaseProperty[];

      setProperties(
        rows.filter((row) => !row.is_deleted).map(removeDatabaseFields),
      );

      setDeletedProperties(
        session
          ? rows.filter((row) => row.is_deleted).map(removeDatabaseFields)
          : [],
      );
    } catch (error) {
      console.error("Unable to load properties from Supabase:", error);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    void loadProperties();
  }, [loadProperties]);

  function addProperty(property: Property) {
    setProperties((current) => {
      const exists = current.some((item) => item.id === property.id);

      return exists
        ? current.map((item) => (item.id === property.id ? property : item))
        : [property, ...current];
    });

    setDeletedProperties((current) =>
      current.filter((item) => item.id !== property.id),
    );
  }

  async function updateProperty(updatedProperty: Property): Promise<void> {
    const { data, error } = await supabase
      .from("properties")
      .update({
        title: updatedProperty.title,
        location: updatedProperty.location,
        price: updatedProperty.price,
        type: updatedProperty.type,
        purpose: updatedProperty.purpose,
        bedrooms: updatedProperty.bedrooms,
        bathrooms: updatedProperty.bathrooms,
        area: updatedProperty.area,
        image: updatedProperty.image,
        images: updatedProperty.images ?? [updatedProperty.image],
        description: updatedProperty.description,
        features: updatedProperty.features ?? [],
        updated_at: new Date().toISOString(),
      })
      .eq("id", updatedProperty.id)
      .select("*")
      .maybeSingle();

    if (error) {
      console.error("Unable to update property in Supabase:", error);
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error(
        "The property was not updated. Check your admin permissions and Supabase RLS policies.",
      );
    }

    const savedRow = data as DatabaseProperty;
    const savedProperty = removeDatabaseFields(savedRow);

    if (savedRow.is_deleted) {
      setProperties((current) =>
        current.filter((item) => item.id !== savedProperty.id),
      );

      setDeletedProperties((current) =>
        current.map((item) =>
          item.id === savedProperty.id ? savedProperty : item,
        ),
      );
    } else {
      setProperties((current) =>
        current.map((item) =>
          item.id === savedProperty.id ? savedProperty : item,
        ),
      );
    }
  }

  async function deleteProperty(id: number): Promise<void> {
    const { data, error } = await supabase
      .from("properties")
      .update({
        is_deleted: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("is_deleted", false)
      .select("*")
      .maybeSingle();

    if (error) {
      console.error("Unable to delete property in Supabase:", error);
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error(
        "The property could not be deleted. Check your admin permissions and RLS policies.",
      );
    }

    const deletedProperty = removeDatabaseFields(data as DatabaseProperty);

    setProperties((current) => current.filter((item) => item.id !== id));

    setDeletedProperties((current) => [
      deletedProperty,
      ...current.filter((item) => item.id !== id),
    ]);
  }

  async function restoreProperty(id: number): Promise<void> {
    const { data, error } = await supabase
      .from("properties")
      .update({
        is_deleted: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("is_deleted", true)
      .select("*")
      .maybeSingle();

    if (error) {
      console.error("Unable to restore property in Supabase:", error);
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error(
        "The property could not be restored. Check your admin permissions and RLS policies.",
      );
    }

    const restoredProperty = removeDatabaseFields(data as DatabaseProperty);

    setProperties((current) => [
      restoredProperty,
      ...current.filter((item) => item.id !== id),
    ]);

    setDeletedProperties((current) => current.filter((item) => item.id !== id));
  }

  return (
    <PropertyContext.Provider
      value={{
        properties,
        deletedProperties,
        addProperty,
        updateProperty,
        deleteProperty,
        restoreProperty,
        refreshProperties: loadProperties,
        hasLoaded,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);

  if (!context) {
    throw new Error("useProperties must be used within a PropertyProvider");
  }

  return context;
}

export default PropertyProvider;
