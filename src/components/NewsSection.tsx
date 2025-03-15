
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, ExternalLink, Search, TrendingUp } from "lucide-react";

// Sample VAT news data
const VAT_NEWS = [
  {
    id: 1,
    title: "New E-commerce VAT Rules Coming to Belgium",
    excerpt: "The Belgian government has announced new VAT regulations for e-commerce businesses operating within the country.",
    date: "2023-06-15",
    readTime: "5 min read",
    category: "Regulations",
    featured: true,
  },
  {
    id: 2,
    title: "Belgium Implements SAF-T Reporting Requirements",
    excerpt: "Starting January 2024, Belgian businesses will need to comply with new Standard Audit File for Tax (SAF-T) requirements.",
    date: "2023-05-28",
    readTime: "4 min read",
    category: "Compliance",
    featured: true,
  },
  {
    id: 3,
    title: "VAT Rate Changes for Sustainable Products",
    excerpt: "Belgium is reducing VAT rates on environmentally friendly products in an effort to promote sustainability.",
    date: "2023-04-10",
    readTime: "3 min read",
    category: "Tax Rates",
    featured: false,
  },
  {
    id: 4,
    title: "Digital Reporting Requirements Update",
    excerpt: "New digital reporting requirements for Belgian businesses will come into effect next quarter.",
    date: "2023-03-22",
    readTime: "6 min read",
    category: "Digital",
    featured: false,
  },
  {
    id: 5,
    title: "Cross-Border VAT Refund Process Simplified",
    excerpt: "The Belgian tax authority has announced a simplified process for cross-border VAT refunds.",
    date: "2023-02-18",
    readTime: "4 min read",
    category: "International",
    featured: false,
  },
  {
    id: 6,
    title: "Quick Fixes for Belgian VAT Returns",
    excerpt: "New 'quick fixes' have been introduced to simplify the VAT return process for Belgian businesses.",
    date: "2023-01-30",
    readTime: "3 min read",
    category: "Returns",
    featured: false,
  },
];

// Sample trending topics
const TRENDING_TOPICS = [
  "E-commerce VAT", "SAF-T Reporting", "Digital Reporting", 
  "VAT Rates", "Cross-Border VAT", "OSS System"
];

export default function NewsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNews, setFilteredNews] = useState(VAT_NEWS);
  
  // Filter news based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredNews(VAT_NEWS);
      return;
    }
    
    const results = VAT_NEWS.filter(
      news => 
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredNews(results);
  }, [searchTerm]);
  
  return (
    <section id="news" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="glass inline-block px-4 py-1.5 rounded-full text-xs font-medium text-primary animate-fade-in">
            Expert Insights
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-balance animate-fade-in">
            Latest VAT News & Updates
          </h2>
          <p className="text-muted-foreground animate-fade-in animate-delay-1">
            Stay informed with our expert analysis of Belgian VAT developments
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium">Featured Articles</h3>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  className="pl-9 w-[200px] md:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Articles</TabsTrigger>
                <TabsTrigger value="regulations">Regulations</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="international">International</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                {filteredNews.length > 0 ? (
                  filteredNews.map((news) => (
                    <Card key={news.id} className={`glass-card overflow-hidden hover:shadow-lg ${news.featured ? 'border-l-4 border-l-primary' : ''}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge className="mb-2">{news.category}</Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {news.date}
                          </div>
                        </div>
                        <CardTitle className="text-xl">{news.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-foreground/80">
                          {news.excerpt}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center pt-0">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {news.readTime}
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary">
                          Read More <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No articles found matching your search.</p>
                    <Button 
                      variant="ghost" 
                      className="mt-2"
                      onClick={() => setSearchTerm("")}
                    >
                      Clear Search
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="regulations" className="space-y-6">
                {filteredNews
                  .filter(news => news.category === "Regulations")
                  .map((news) => (
                    <Card key={news.id} className="glass-card overflow-hidden hover:shadow-lg">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge className="mb-2">{news.category}</Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {news.date}
                          </div>
                        </div>
                        <CardTitle className="text-xl">{news.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-foreground/80">
                          {news.excerpt}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center pt-0">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {news.readTime}
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary">
                          Read More <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </TabsContent>
              
              <TabsContent value="compliance" className="space-y-6">
                {filteredNews
                  .filter(news => news.category === "Compliance")
                  .map((news) => (
                    <Card key={news.id} className="glass-card overflow-hidden hover:shadow-lg">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge className="mb-2">{news.category}</Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {news.date}
                          </div>
                        </div>
                        <CardTitle className="text-xl">{news.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-foreground/80">
                          {news.excerpt}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center pt-0">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {news.readTime}
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary">
                          Read More <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </TabsContent>
              
              <TabsContent value="international" className="space-y-6">
                {filteredNews
                  .filter(news => news.category === "International")
                  .map((news) => (
                    <Card key={news.id} className="glass-card overflow-hidden hover:shadow-lg">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge className="mb-2">{news.category}</Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {news.date}
                          </div>
                        </div>
                        <CardTitle className="text-xl">{news.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-foreground/80">
                          {news.excerpt}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center pt-0">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {news.readTime}
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary">
                          Read More <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_TOPICS.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">VAT Resources</CardTitle>
                <CardDescription>
                  Download our expert guides and resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 group cursor-pointer">
                  <div className="p-2 bg-primary/10 rounded text-primary">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                      2023 Belgian VAT Compliance Guide
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Complete overview of VAT requirements
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group cursor-pointer">
                  <div className="p-2 bg-primary/10 rounded text-primary">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                      E-commerce VAT Checklist
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Essential requirements for online businesses
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group cursor-pointer">
                  <div className="p-2 bg-primary/10 rounded text-primary">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                      International VAT Registration Guide
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Step-by-step process for foreign businesses
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Resources
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="glass-card bg-blue-gradient/30">
              <CardHeader>
                <CardTitle className="text-lg">Newsletter</CardTitle>
                <CardDescription>
                  Stay updated with VAT news delivered to your inbox
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Your email address" />
                <Button className="w-full">Subscribe</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
