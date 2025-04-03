
export interface TutorialStep {
  title: string;
  content: string;
  image: string; // Adding image field
}

export interface TutorialData {
  title: string;
  steps: TutorialStep[];
}

export interface TutorialCollection {
  [key: string]: TutorialData;
}

export const tutorials: TutorialCollection = {
  'products': {
    title: 'Product Management Tutorial',
    steps: [
      {
        title: 'Browse Products',
        content: 'Navigate to the Products page to view all your available products. You can sort and filter the list to find specific items quickly.',
        image: '/lovable-uploads/2e8d7e13-e806-49be-af90-ea8c2af91109.png'
      },
      {
        title: 'Product Details',
        content: 'Click on any product to view detailed information including ingredients, pricing, and inventory status.',
        image: '/lovable-uploads/44cb127a-3102-4e33-bf98-e24271681e14.png'
      },
      {
        title: 'Update Products',
        content: 'Use the edit button to update product information or adjust inventory levels as needed.',
        image: '/lovable-uploads/66a6a905-50a4-496e-8a39-eb7e19d58178.png'
      }
    ]
  },
  'ingredients': {
    title: 'Emma Ingredients Tutorial',
    steps: [
      {
        title: 'Explore Ingredients Database',
        content: 'Browse through our extensive ingredients database to find the perfect components for your products.',
        image: '/lovable-uploads/53c24c90-400a-44f6-a9bc-2205d1721e88.png'
      },
      {
        title: 'Filter by Category',
        content: 'Use the category filters to narrow down ingredients by type, function, or properties.',
        image: '/lovable-uploads/8860d268-f972-4fe4-851f-ebe40c9994e4.png'
      },
      {
        title: 'Product Simulator',
        content: 'Try our product simulator to see how different ingredient combinations work together.',
        image: '/lovable-uploads/924451c9-9fff-4172-9575-440283699171.png'
      }
    ]
  },
  'forecasts': {
    title: 'Sales Forecasts Tutorial',
    steps: [
      {
        title: 'View Analytics Dashboard',
        content: 'The forecasts page provides an overview of your projected sales and performance metrics.',
        image: '/lovable-uploads/c13d39fd-c905-47bf-851e-c83cb104ef06.png'
      },
      {
        title: 'Understand Trends',
        content: 'Analyze sales trends over time to identify patterns and opportunities for growth.',
        image: '/lovable-uploads/d4ffa129-b0aa-44e7-a687-b046e9eecd59.png'
      },
      {
        title: 'Export Reports',
        content: 'Export detailed reports for your records or to share with team members.',
        image: '/lovable-uploads/e7d663d7-1652-4978-8d2e-fbd5afac95b5.png'
      }
    ]
  }
};
