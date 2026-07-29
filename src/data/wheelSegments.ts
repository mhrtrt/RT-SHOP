import { WheelSegment } from '../types';

export const WHEEL_SEGMENTS: WheelSegment[] = [
  {
    id: 'fridge',
    label: 'রেফ্রিজারেটর',
    subLabel: 'Double Door',
    iconName: 'fridge',
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=200&q=80',
    bgColor: '#dc2626', // Red
    textColor: '#ffffff',
    type: 'prize_rigged'
  },
  {
    id: 'sorry_1',
    label: 'দুঃখিত',
    subLabel: 'আবার চেষ্টা করুন',
    iconName: 'sorry',
    bgColor: '#475569', // Slate
    textColor: '#f8fafc',
    type: 'sorry'
  },
  {
    id: 'airpods',
    label: 'AirPods Pro',
    subLabel: 'Wireless',
    iconName: 'airpods',
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=200&q=80',
    bgColor: '#d97706', // Gold/Amber
    textColor: '#ffffff',
    type: 'prize_rigged'
  },
  {
    id: 'sorry_2',
    label: 'দুঃখিত',
    subLabel: 'ভাগ্যে নেই',
    iconName: 'sorry',
    bgColor: '#334155', // Slate Dark
    textColor: '#f8fafc',
    type: 'sorry'
  },
  {
    id: 'phone',
    label: 'Realme C75',
    subLabel: 'Smartphone',
    iconName: 'phone',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=200&q=80',
    bgColor: '#2563eb', // Royal Blue
    textColor: '#ffffff',
    type: 'prize_rigged'
  },
  {
    id: 'blender',
    label: 'ব্লেন্ডার',
    subLabel: 'Heavy Duty',
    iconName: 'blender',
    imageUrl: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=200&q=80',
    bgColor: '#7c3aed', // Purple
    textColor: '#ffffff',
    type: 'prize_rigged'
  },
  {
    id: 'spins',
    label: '+৩ টি স্পিন',
    subLabel: 'অভিনন্দন!',
    iconName: 'spins',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=200&q=80',
    bgColor: '#16a34a', // Emerald Green
    textColor: '#ffffff',
    type: 'extra_spins'
  }
];

export const INITIAL_FAKE_WINNERS = [
  { id: '1', phone: '017****5821', prize: 'AirPods Pro', timeAgo: '২ মিনিট আগে', avatarColor: 'bg-amber-500' },
  { id: '2', phone: '018****9304', prize: '+৩ টি ফ্রী স্পিন', timeAgo: '৪ মিনিট আগে', avatarColor: 'bg-emerald-500' },
  { id: '3', phone: '019****1149', prize: 'Realme C75', timeAgo: '৭ মিনিট আগে', avatarColor: 'bg-blue-500' },
  { id: '4', phone: '015****6620', prize: 'রেফ্রিজারেটর', timeAgo: '১০ মিনিট আগে', avatarColor: 'bg-red-500' },
  { id: '5', phone: '016****4482', prize: '+৩ টি ফ্রী স্পিন', timeAgo: '১২ মিনিট আগে', avatarColor: 'bg-teal-500' },
  { id: '6', phone: '013****7831', prize: 'স্মার্ট ব্লেন্ডার', timeAgo: '১৫ মিনিট আগে', avatarColor: 'bg-purple-500' }
];
