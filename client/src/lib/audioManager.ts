/**
 * audioManager — 1% Playground
 * Simple audio playback manager for Aria Rabbit voice lines and UI sounds.
 * ElevenLabs voice scripts will be dropped in via the CDN URLs below.
 * All audio is sourced from the existing CloudFront CDN.
 */

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663435070666/UKZTwoEXuGkRzDU2B5gMpQ";

// Voice line registry — replace placeholder URLs with real ElevenLabs audio
export const VOICE_LINES: Record<string, string> = {
  // Aria Rabbit — CFO / Daily Operations Director
  aria_welcome:      `${CDN}/aria_welcome_v1.mp3`,
  aria_terms:        `${CDN}/aria_terms_v1.mp3`,
  aria_congrats:     `${CDN}/aria_congrats_v1.mp3`,
  aria_login:        `${CDN}/aria_login_v1.mp3`,
  aria_onboard_1:    `${CDN}/aria_onboard_1_v1.mp3`,
  aria_onboard_2:    `${CDN}/aria_onboard_2_v1.mp3`,

  // Staff bots
  hammer_intro:      `${CDN}/hammer_intro_v1.mp3`,
  shadow_intro:      `${CDN}/shadow_intro_v1.mp3`,
  vault_intro:       `${CDN}/vault_intro_v1.mp3`,
  bridge_intro:      `${CDN}/bridge_intro_v1.mp3`,
  patriarch_intro:   `${CDN}/patriarch_intro_v1.mp3`,
  queen_intro:       `${CDN}/queen_intro_v1.mp3`,
  prince_intro:      `${CDN}/prince_intro_v1.mp3`,
  manila_intro:      `${CDN}/manila_closer_intro_v1.mp3`,
  mumbai_intro:      `${CDN}/mumbai_mogul_intro_v1.mp3`,
  rook_intro:        `${CDN}/rook_intro_v1.mp3`,

  // UI sounds
  ui_chime:          `${CDN}/ui_chime_v1.mp3`,
  ui_unlock:         `${CDN}/ui_unlock_v1.mp3`,
  ui_notification:   `${CDN}/ui_notification_v1.mp3`,
};

let currentAudio: HTMLAudioElement | null = null;
let isMuted = false;

/**
 * Play a named voice line. Stops any currently playing audio first.
 */
export function playVoiceLine(key: string, volume = 0.85): void {
  if (isMuted) return;
  const url = VOICE_LINES[key];
  if (!url) return;

  try {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(() => {
      // Autoplay blocked — user interaction required
    });
    currentAudio = audio;
  } catch {
    // Audio not supported or unavailable
  }
}

/**
 * Play audio from a direct URL (for dynamic CDN assets).
 */
export function playAudioUrl(url: string, volume = 0.85): void {
  if (isMuted || !url) return;
  try {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(() => {});
    currentAudio = audio;
  } catch {
    // Audio not supported
  }
}

/**
 * Stop all audio immediately.
 */
export function stopAudio(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

/**
 * Mute / unmute all audio.
 */
export function setMuted(muted: boolean): void {
  isMuted = muted;
  if (muted && currentAudio) {
    currentAudio.pause();
  }
}

export function getMuted(): boolean {
  return isMuted;
}
