import { useEffect, useState } from 'react';

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  /**
   * Add Event Listeners:
   * 1. offline: It is triggered when the user's internet is offline
   * 2. online: It is triggered when the user's internet is online
   * 
   * Note: These listeners will keep on listening to the internet connection
   *       status, even if the component is unmounted.
  */
  useEffect(() => {
    window.addEventListener('offline', () => {
      setOnlineStatus(false);
    });

    window.addEventListener('online', () => {
      setOnlineStatus(true);
    });
  }, []);

  /**
   * Return the online status:
   * 1. onlineStatus: It is a boolean value
   * 2. onlineStatus is true when the user's internet is online
   * 3. onlineStatus is false when the user's internet is offline
  */
  return onlineStatus;
};

export default useOnlineStatus;
