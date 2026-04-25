'use client';

import { useUser } from '@/context/UserContext';
import { AvatarComponent } from '@rainbow-me/rainbowkit';

export const CustomRainbowAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  const { profilePic } = useUser();
  
  return (
    <div 
      style={{ 
        width: size, 
        height: size, 
        borderRadius: size / 4, // Brutalist slight roundness
        overflow: 'hidden',
        border: '2px solid black',
        backgroundColor: '#f472b6' // Retro pink bg
      }}
    >
      <img
        src={profilePic}
        width={size}
        height={size}
        style={{ objectFit: 'cover' }}
        alt="User Profile"
      />
    </div>
  );
};
