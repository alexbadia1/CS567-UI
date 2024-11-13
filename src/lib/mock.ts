import { IArticle } from './model';
import articles from '../assets/mock.json';

export async function mockFetchArticles(): Promise<IArticle[]> {
  return new Promise<IArticle[]>((resolve) => {
    setTimeout(() => {
      resolve(articles['data']);
    }, 1000); // Simulate a 1 second delay
  });
}


export async function mockFetchArticle(id: string = '69'): Promise<IArticle> {
  return new Promise<IArticle>((resolve) => {
    setTimeout(() => {
      console.log('fetching article', id);
      resolve({
        id,
        headline: 'Mock Article Title',
        body: `Your father is about to ask me the question. This is the most important moment in our lives, and I want to pay attention, note every detail. Your dad and I have just come back from an evening out, dinner and a show; it’s after midnight. We came out onto the patio to look at the full moon; then I told your dad I wanted to dance, so he humors me and now we’re slow-dancing, a pair of thirtysomethings swaying back and forth in the moon-light like kids. I don’t feel the night chill at all. And then your dad says, “Do you want to make a baby?”
        
        Right now your dad and I have been married for about two years, living on Ellis Avenue; when we move out you’ll still be too young to remember the house, but we’ll show you pictures of it, tell you stories about it. I’d love to tell you the story of this evening, the night you’re conceived, but the right time to do that would be when you’re ready to have children of your own, and we’ll never get that chance.
        
        Telling it to you any earlier wouldn’t do any good; for most of your life you won’t sit still to hear such a romantic— you’d say sappy—story. I remember the scenario of your origin you’ll suggest when you’re twelve.

        “The only reason you had me was so you could get a maid you wouldn’t have to pay,” you’ll say bitterly, dragging the vacuum cleaner out of the closet.

        “That’s right,” I’ll say. “Thirteen years ago I knew the carpets would need vacuuming around now, and having a baby seemed to be the cheapest and easiest way to get the job done. Now kindly get on with it.”

        “If you weren’t my mother, this would be illegal,” you’ll say, seething as you unwind the power cord and plug it into the wall outlet.
        
        That will be in the house on Belmont Street. I’ll live to see strangers occupy both houses: the one you’re conceived in and the one you grow up in. Your dad and I will sell the first a couple years aer your arrival. I’ll sell the second shortly after your departure. By then Nelson and I will have moved into our farmhouse, and your dad will be living with what’s-her-name.`,
        factCheckUrl: 'Mock Author',
      });
    }, 1000); // Simulate a 1 second delay
  });
}
