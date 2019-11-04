import { useContext } from 'react';
import { SessionContext } from '../components/Providers/Session';

export default function useSession() {
  return useContext(SessionContext);
}
