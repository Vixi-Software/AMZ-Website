import { useState, useCallback } from "react";

export function useFetchCrud(baseUrl) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET
  const get = useCallback(async (endpoint = "") => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}${endpoint}`);
      if (!res.ok) throw new Error("Fetch failed");
      const result = await res.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  // POST
  const post = useCallback(async (endpoint = "", body = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Post failed");
      const result = await res.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  // PUT
  const put = useCallback(async (endpoint = "", body = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Put failed");
      const result = await res.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  // DELETE
  const remove = useCallback(async (endpoint = "") => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setData(null);
      return true;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  return { data, loading, error, get, post, put, remove };
}