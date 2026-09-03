import { useSelector, useDispatch } from "react-redux";

/**
 * Small convenience wrapper around the auth slice so components don't need
 * to know the state shape or import useSelector/useDispatch everywhere.
 */
export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return { ...auth, dispatch };
}
