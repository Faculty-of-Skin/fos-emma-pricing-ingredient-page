
export interface TutorialStep {
  title: string;
  content: string;
  image: string;
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
        image: '/tutorial/products-1.png'
      },
      {
        title: 'Product Details',
        content: 'Click on any product to view detailed information including ingredients, pricing, and inventory status.',
        image: '/tutorial/products-2.png'
      },
      {
        title: 'Update Products',
        content: 'Use the edit button to update product information or adjust inventory levels as needed.',
        image: '/tutorial/products-3.png'
      }
    ]
  },
  'ingredients': {
    title: 'Emma Ingredients Tutorial',
    steps: [
      {
        title: 'Explore Ingredients Database',
        content: 'Browse through our extensive ingredients database to find the perfect components for your products.',
        image: '/tutorial/ingredients-1.png'
      },
      {
        title: 'Filter by Category',
        content: 'Use the category filters to narrow down ingredients by type, function, or properties.',
        image: '/tutorial/ingredients-2.png'
      },
      {
        title: 'Product Simulator',
        content: 'Try our product simulator to see how different ingredient combinations work together.',
        image: '/tutorial/ingredients-3.png'
      }
    ]
  },
  'forecasts': {
    title: 'Sales Forecasts Tutorial',
    steps: [
      {
        title: 'View Analytics Dashboard',
        content: 'The forecasts page provides an overview of your projected sales and performance metrics.',
        image: '/tutorial/forecasts-1.png'
      },
      {
        title: 'Understand Trends',
        content: 'Analyze sales trends over time to identify patterns and opportunities for growth.',
        image: '/tutorial/forecasts-2.png'
      },
      {
        title: 'Export Reports',
        content: 'Export detailed reports for your records or to share with team members.',
        image: '/tutorial/forecasts-3.png'
      }
    ]
  }
};
