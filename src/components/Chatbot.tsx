import React, { useState } from 'react';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  items: any[];
}

const Chatbot: React.FC<ChatbotProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m your shopping assistant. I can help you find products, check availability, or answer any questions you have. How can I help you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Product search
    if (lowerMessage.includes('find') || lowerMessage.includes('search') || lowerMessage.includes('looking for')) {
      const matchingItems = items.filter(item => 
        item.name.toLowerCase().includes(lowerMessage) ||
        item.type.toLowerCase().includes(lowerMessage) ||
        item.category.toLowerCase().includes(lowerMessage)
      );
      
      if (matchingItems.length > 0) {
        const itemNames = matchingItems.slice(0, 3).map(item => item.name).join(', ');
        return `I found these products that might interest you: ${itemNames}. Would you like more details about any of these?`;
      } else {
        return 'I couldn\'t find any products matching your search. Try searching for categories like "clothing", "beauty", "electronics", or "sports".';
      }
    }
    
    // Stock availability
    if (lowerMessage.includes('stock') || lowerMessage.includes('available') || lowerMessage.includes('in stock')) {
      return 'All products shown on our website are currently in stock and ready to ship! If you\'re looking for a specific item, please let me know the product name.';
    }
    
    // Shipping
    if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery') || lowerMessage.includes('when will')) {
      return 'We offer free shipping on orders over $50! Standard delivery takes 3-5 business days, and express delivery takes 1-2 business days. Would you like to know about shipping costs?';
    }
    
    // Returns
    if (lowerMessage.includes('return') || lowerMessage.includes('refund') || lowerMessage.includes('exchange')) {
      return 'We have a 30-day return policy! You can return any item in its original condition within 30 days of purchase for a full refund or exchange.';
    }
    
    // Categories
    if (lowerMessage.includes('categories') || lowerMessage.includes('what do you sell')) {
      return 'We sell a variety of products including Clothing, Beauty products, Electronics, Sports gear, Home & Garden items, Books, and Toys. What category interests you most?';
    }
    
    // Pricing
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive')) {
      return 'Our prices are competitive and we often have special offers! You can filter products by price range or let me know your budget and I\'ll help you find suitable options.';
    }
    
    // Account/Login
    if (lowerMessage.includes('account') || lowerMessage.includes('login') || lowerMessage.includes('sign up')) {
      return 'You can create an account by clicking the Login button in the top right corner. Choose "Buyer" to shop or "Seller" if you want to sell products on our platform!';
    }
    
    // Payment
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('credit card')) {
      return 'We accept all major credit cards, PayPal, and other secure payment methods. Your payment information is always encrypted and secure.';
    }
    
    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello! Great to see you here. I\'m here to help you find the perfect products. What are you shopping for today?';
    }
    
    // Thanks
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return 'You\'re very welcome! I\'m always here to help. Is there anything else you\'d like to know?';
    }
    
    // Default response
    return 'I\'m here to help! You can ask me about:\n• Finding specific products\n• Stock availability\n• Shipping and delivery\n• Returns and refunds\n• Product categories\n• Account creation\n\nWhat would you like to know?';
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 z-40 ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-80 h-96 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 z-50 flex flex-col transition-all duration-300 ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600/20 p-2 rounded-full border border-blue-500/30">
              <Bot className="text-blue-400" size={20} />
            </div>
            <div>
              <h3 className="text-white font-semibold">Shopping Assistant</h3>
              <p className="text-gray-400 text-xs">Online now</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${
                message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isBot 
                    ? 'bg-blue-600/20 border border-blue-500/30' 
                    : 'bg-gray-700'
                }`}>
                  {message.isBot ? (
                    <Bot className="text-blue-400" size={16} />
                  ) : (
                    <User className="text-gray-300" size={16} />
                  )}
                </div>
                <div className={`rounded-lg p-3 ${
                  message.isBot 
                    ? 'bg-gray-800 text-gray-300' 
                    : 'bg-blue-600 text-white'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors duration-200"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;