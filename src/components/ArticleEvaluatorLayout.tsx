import React from 'react';
import ArticleEvaluator from './ArticleEvaluator';
import ArticleHowItWorks from './ArticleHowItWorks';
import ArticleFAQ from './ArticleFAQ';

const ArticleEvaluatorLayout: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Tool Section */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-gray-700/50 mb-12">
        <ArticleEvaluator />
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-gray-700/50 mb-12">
        <ArticleHowItWorks />
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-gray-700/50">
        <ArticleFAQ />
      </div>
    </div>
  );
};

export default ArticleEvaluatorLayout;
