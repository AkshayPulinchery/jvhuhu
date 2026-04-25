'use client';

import { useUser } from '@/context/UserContext';
import { motion } from 'framer-motion';
import { User, Camera, Save } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const { username, profilePic, updateUsername, updateProfilePic } = useUser();
  const [tempName, setTempName] = useState(username);
  const [tempPic, setTempPic] = useState(profilePic);
  
  const avatars = [
    'https://api.dicebear.com/7.x/pixel-art/svg?seed=Felix',
    'https://api.dicebear.com/7.x/pixel-art/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/pixel-art/svg?seed=Charlie',
    'https://api.dicebear.com/7.x/pixel-art/svg?seed=Zoi',
    'https://api.dicebear.com/7.x/pixel-art/svg?seed=Nala',
    'https://api.dicebear.com/7.x/pixel-art/svg?seed=Bear',
  ];

  const handleSave = () => {
    updateUsername(tempName);
    updateProfilePic(tempPic);
    alert('Profile Updated! 🚀');
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar p-4 md:p-8 flex flex-col items-center">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-[4px] border-black shadow-[8px_8px_0_0_black] p-6 md:p-8 flex flex-col gap-6 w-full max-w-2xl my-auto"
      >
        <h1 className="text-4xl font-black uppercase tracking-tight bg-[var(--color-retro-yellow)] inline-block p-2 border-[3px] border-black self-start">
          Profile Settings
        </h1>

        <div className="flex flex-col gap-2">
          <label className="font-black uppercase text-sm">Username</label>
          <div className="flex gap-2">
            <div className="bg-black p-3 text-white">
              <User size={24} />
            </div>
            <input 
              className="flex-1 border-[3px] border-black p-3 font-bold outline-none focus:bg-gray-50"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="font-black uppercase text-sm">Profile Picture</label>
          
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 border-[4px] border-black shadow-[4px_4px_0_0_black] overflow-hidden bg-white">
              <img src={tempPic} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-xs font-bold text-gray-500 uppercase">Choose an avatar or paste a URL</p>
              <input 
                className="w-full border-[3px] border-black p-2 font-mono text-xs outline-none"
                value={tempPic}
                onChange={(e) => setTempPic(e.target.value)}
                placeholder="Image URL..."
              />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {avatars.map((url) => (
              <motion.button
                key={url}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTempPic(url)}
                className={`border-[2px] border-black aspect-square overflow-hidden bg-white ${tempPic === url ? 'ring-4 ring-[var(--color-retro-pink)]' : ''}`}
              >
                <img src={url} alt="Avatar option" className="w-full h-full" />
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="bg-[var(--color-retro-green)] p-4 font-black uppercase text-xl flex items-center justify-center gap-2 border-[4px] border-black shadow-[6px_6px_0_0_black] mt-4"
        >
          <Save size={24} /> Save Changes
        </motion.button>
      </motion.div>
    </div>
  );
}
