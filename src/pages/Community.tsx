import { MessageSquare, ThumbsUp, Share2, Search, TrendingUp, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const posts = [
  {
    id: 1,
    author: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    time: '2 hours ago',
    title: 'Finally hit my 100kg squat goal! 🎉',
    content: 'It took 6 months of consistent training but I finally did it. Thanks to Coach Marcus for the program!',
    likes: 124,
    comments: 18,
    tags: ['Achievement', 'Strength']
  },
  {
    id: 2,
    author: 'Mike Thompson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    time: '5 hours ago',
    title: 'What is your favorite post-workout meal?',
    content: 'Looking for some new ideas. Currently doing chicken and rice but getting a bit bored.',
    likes: 45,
    comments: 32,
    tags: ['Nutrition', 'Advice']
  },
  {
    id: 3,
    author: 'Emma Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    time: '1 day ago',
    title: 'Yoga for recovery: How often do you guys do it?',
    content: 'I find it helps a lot but struggling to fit it into my 5-day lifting schedule.',
    likes: 89,
    comments: 12,
    tags: ['Recovery', 'Yoga']
  }
];

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trending Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {['#MuscleGrowth', '#MarathonPrep', '#IntermittentFasting', '#VeganAthlete'].map(tag => (
                <div key={tag} className="flex items-center justify-between text-sm cursor-pointer hover:text-primary transition-colors">
                  <span className="font-medium">{tag}</span>
                  <TrendingUp className="w-3 h-3" />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
               <h3 className="font-bold mb-2">Member of the Month</h3>
               <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-10 h-10 border-2 border-white">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Winner" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold">John Doe</p>
                    <p className="text-[10px] opacity-80">-15kg in 3 months</p>
                  </div>
               </div>
               <Button variant="secondary" size="sm" className="w-full">View Story</Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-4">
             <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
               <Input placeholder="Search forum..." className="pl-10 h-11 bg-muted/50 border-none rounded-xl" />
             </div>
             <Button className="h-11 rounded-xl gap-2">
               <Plus className="w-4 h-4" /> New Post
             </Button>
          </div>

          {posts.map(post => (
            <Card key={post.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={post.avatar} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-bold">{post.author}</h4>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.content}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="font-bold text-[10px] uppercase">{tag}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-6 pt-4 border-t">
                  <button className="flex items-center gap-1.5 text-sm font-bold hover:text-primary transition-colors">
                    <ThumbsUp className="w-4 h-4" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm font-bold hover:text-primary transition-colors">
                    <MessageSquare className="w-4 h-4" /> {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm font-bold hover:text-primary transition-colors ml-auto">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Stats */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Online Now</span>
                <span className="text-sm font-bold text-green-500">1,240</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Members</span>
                <span className="text-sm font-bold">52,490</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">New Topics</span>
                <span className="text-sm font-bold">142</span>
              </div>
            </CardContent>
          </Card>
          <div className="rounded-2xl overflow-hidden aspect-[3/4] relative">
            <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/community-fitness-fd20d82f-1775401323740.webp" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-end p-6">
              <p className="text-white font-black text-xl italic leading-tight uppercase">Strength in Numbers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}