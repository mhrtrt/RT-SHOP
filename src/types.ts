export interface WheelSegment {
  id: string;
  label: string;
  subLabel?: string;
  iconName: 'airpods' | 'phone' | 'fridge' | 'blender' | 'sorry' | 'spins';
  imageUrl?: string;
  bgColor: string;
  textColor: string;
  type: 'prize_rigged' | 'sorry' | 'extra_spins';
}

export interface AdConfig {
  directLinkUrl: string;
  bannerScriptCode: string;
  autoOpenTab: boolean;
  simulatedAdSeconds: number;
}

export interface FakeWinner {
  id: string;
  phone: string;
  prize: string;
  timeAgo: string;
  avatarColor: string;
}

export type SpinStage = 'idle' | 'spinning' | 'landed' | 'showing_ad' | 'ad_cancelled_modal' | 'ad_sorry_modal' | 'extra_spins_modal';
