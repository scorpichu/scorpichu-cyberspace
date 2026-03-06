import { BlogPost } from '@/lib/types'

export const defaultPosts: BlogPost[] = [
  {
    id: 'post1',
    title: 'Website Launch & The Perfect Aesthetic',
    content: "Finally did it! After thinking about it for ages, I've carved out my own little corner of the internet. I wanted a space that felt authentically *me*—a mix of Y2K nostalgia, clean layouts, and that specific blue-toned calm111!!!!!\n\nThe hardest part was coding. I learnt a bit of HTML from youtube videos, and used free online templates too! I surfed pinterest for inspo, and ultimately settled on a blue-white theme; but I totally will change it for new aesthetics I think.",
    tags: 'web design, aesthetic, personal',
    author: 'naomi',
    images: [
      {
        src: 'https://i.pinimg.com/736x/80/e7/6a/80e76af996d812ce01da3536f71821ea.jpg',
        name: 'Aesthetic moodboard with blue tones and retro graphics',
      },
    ],
    created_at: '2026-02-10T12:00:00.000Z',
  },
  {
    id: 'post2',
    title: 'Current Aesthetic Obsessions',
    content: "My IG and pinterest boards are so chaotic but in the best way possible... currently deep into a very specific visual rabbit hole that blends Heisei-era retrofuturism with early web aesthetics, which is obvious looking at this webdesign LOL.\n\nbut it's not just about how it looks, the reason why I added the \"Music Playing...\" tab is because I'm most inspired to create when I listen to music... SO I added the songs I was listening to when I was making this for yall to capture the feel.",
    tags: 'visual, aesthetic, heisei, collage',
    author: 'naomi',
    images: [
      {
        src: 'https://i.pinimg.com/736x/cb/fd/cc/cbfdcc9a7db7c20ddd16bba0c77a5c83.jpg',
        name: 'Visual inspiration 1',
      },
      {
        src: 'https://i.pinimg.com/736x/30/7c/95/307c95cae4caf188af3ed0e564ef5131.jpg',
        name: 'Visual inspiration 2',
      },
    ],
    created_at: '2026-02-08T10:30:00.000Z',
  },
]
