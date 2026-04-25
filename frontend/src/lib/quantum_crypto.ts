/**
 * Quantum-Inspired Encryption Utility
 * Based on the concept of Phase-Shift Rotation (Schrödinger-inspired logic)
 */

export class QuantumCrypto {
  private static readonly PHI = (1 + Math.sqrt(5)) / 2; // Golden ratio for non-repeating shift

  /**
   * Encrypts a string using a Quantum Phase Rotation formula
   * Formula: c = (p + floor(h * sin(E/h))) mod 256
   * where E = h*f (Plancks Law inspired shift)
   */
  static encrypt(text: string, seed: string): string {
    const key = this.generateQuantumKey(seed);
    const result = text.split('').map((char, i) => {
      const p = char.charCodeAt(0);
      const k = key[i % key.length];
      
      // Simulate quantum phase shift
      const h = 6.626; // Planck's constant approximation
      const phase = (p * k * this.PHI) % (2 * Math.PI);
      const shift = Math.floor(h * Math.sin(phase) + k);
      
      return String.fromCharCode((p + shift) % 256);
    }).join('');
    
    return btoa(result);
  }

  /**
   * Decrypts a string using the inverse Phase Rotation
   */
  static decrypt(encryptedBase64: string, seed: string): string {
    try {
      const text = atob(encryptedBase64);
      const key = this.generateQuantumKey(seed);
      
      return text.split('').map((char, i) => {
        const c = char.charCodeAt(0);
        const k = key[i % key.length];
        
        // Find p such that (p + shift) % 256 == c
        // We iterate 256 possibilities (Quantum superposition simulation) to find the collapsed state
        for (let p = 0; p < 256; p++) {
          const h = 6.626;
          const phase = (p * k * this.PHI) % (2 * Math.PI);
          const shift = Math.floor(h * Math.sin(phase) + k);
          if ((p + shift) % 256 === c) {
            return String.fromCharCode(p);
          }
        }
        return '?';
      }).join('');
    } catch {
      return "[Decryption Failed - Wavefunction Collapsed]";
    }
  }

  private static generateQuantumKey(seed: string): number[] {
    const key = [];
    let state = 0;
    for (let i = 0; i < seed.length; i++) {
        state = (state + seed.charCodeAt(i)) % 360;
    }
    
    // Generate a deterministically "noisy" key sequence
    for (let i = 0; i < 32; i++) {
        const energy = Math.abs(Math.sin(state + i * this.PHI) * 100);
        key.push(Math.floor(energy));
    }
    return key;
  }
}
