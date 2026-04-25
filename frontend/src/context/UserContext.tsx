'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  username: string;
  profilePic: string;
  destroyedIds: number[];
  updateUsername: (name: string) => void;
  updateProfilePic: (pic: string) => void;
  destroyEmail: (id: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState('CuteUser_01');
  const [profilePic, setProfilePic] = useState('https://api.dicebear.com/7.x/pixel-art/svg?seed=Felix');
  const [destroyedIds, setDestroyedIds] = useState<number[]>([]);

  // Persist to local storage
  useEffect(() => {
    const savedName = localStorage.getItem('cutemail_username');
    const savedPic = localStorage.getItem('cutemail_profilepic');
    if (savedName) setUsername(savedName);
    if (savedPic) setProfilePic(savedPic);
  }, []);

  const updateUsername = (name: string) => {
    setUsername(name);
    localStorage.setItem('cutemail_username', name);
  };

  const updateProfilePic = (pic: string) => {
    setProfilePic(pic);
    localStorage.setItem('cutemail_profilepic', pic);
  };

  const destroyEmail = (id: number) => {
    setDestroyedIds(prev => [...prev, id]);
  };

  return (
    <UserContext.Provider value={{ username, profilePic, destroyedIds, updateUsername, updateProfilePic, destroyEmail }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
