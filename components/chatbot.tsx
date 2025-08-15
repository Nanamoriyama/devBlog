'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Bot,
  Minimize2,
  Maximize2
} from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

// Pre-defined responses for common questions about frontend development
const botResponses: Record<string, string> = {
  // Greetings
  'hello': "Hi there! 👋 I'm your frontend development assistant. I can help you with React, TypeScript, CSS, performance optimization, and more. What would you like to know?",
  'hi': "Hello! 🚀 I'm here to help with frontend development questions. Feel free to ask about React, Next.js, TypeScript, or any web development topics!",
  'hey': "Hey! 👩‍💻 Ready to dive into some frontend development? I can help with React patterns, CSS techniques, performance tips, and much more!",
  
  // React questions
  'react': "React is an amazing library! 🔧 Here are some key concepts:\n\n• **Components**: Building blocks of React apps\n• **Hooks**: useState, useEffect, useContext, etc.\n• **Props**: Data flow between components\n• **State Management**: Local state vs global state\n\nNeed help with a specific React concept?",
  'hooks': "React Hooks are powerful! 🎣 Here are the most common ones:\n\n• **useState**: For component state\n• **useEffect**: For side effects\n• **useContext**: For consuming context\n• **useMemo**: For expensive calculations\n• **useCallback**: For function memoization\n\nWhich hook would you like to learn more about?",
  'usestate': "useState is perfect for component state! 📊\n\n```javascript\nconst [count, setCount] = useState(0);\n\n// Update state\nsetCount(count + 1);\n// Or with function\nsetCount(prev => prev + 1);\n```\n\nRemember: always use the functional update when the new state depends on the previous state!",
  'useeffect': "useEffect handles side effects! ⚡\n\n```javascript\n// Run once on mount\nuseEffect(() => {\n  fetchData();\n}, []);\n\n// Run when dependency changes\nuseEffect(() => {\n  updateTitle();\n}, [count]);\n\n// Cleanup\nuseEffect(() => {\n  const timer = setInterval(tick, 1000);\n  return () => clearInterval(timer);\n}, []);\n```",
  
  // TypeScript questions
  'typescript': "TypeScript adds type safety to JavaScript! 🛡️\n\n**Benefits:**\n• Catch errors at compile time\n• Better IDE support\n• Self-documenting code\n• Easier refactoring\n\n**React + TypeScript:**\n```typescript\ninterface Props {\n  name: string;\n  age?: number;\n}\n\nconst Component: React.FC<Props> = ({ name, age }) => {\n  return <div>Hello {name}!</div>;\n};\n```",
  'types': "TypeScript types help catch bugs early! 🐛\n\n**Basic types:**\n• `string`, `number`, `boolean`\n• `string[]` or `Array<string>`\n• `object`, `any`, `unknown`\n\n**React types:**\n• `React.FC<Props>`\n• `React.ReactNode`\n• `React.CSSProperties`\n• `React.MouseEvent<HTMLButtonElement>`",
  
  // CSS questions
  'css': "CSS is the styling powerhouse! 🎨\n\n**Modern CSS features:**\n• **Flexbox**: One-dimensional layouts\n• **Grid**: Two-dimensional layouts\n• **Custom Properties**: CSS variables\n• **Container Queries**: Element-based responsive design\n• **Logical Properties**: International-friendly spacing\n\nWhat CSS topic interests you?",
  'flexbox': "Flexbox is perfect for one-dimensional layouts! 📏\n\n```css\n.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n}\n\n.item {\n  flex: 1; /* grow and shrink */\n}\n```\n\n**Key properties:**\n• `justify-content`: main axis alignment\n• `align-items`: cross axis alignment\n• `flex-direction`: row or column",
  'grid': "CSS Grid handles complex layouts beautifully! 🏗️\n\n```css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 2rem;\n}\n\n/* Named grid areas */\n.layout {\n  grid-template-areas:\n    'header header'\n    'sidebar main'\n    'footer footer';\n}\n```",
  
  // Performance questions
  'performance': "Web performance is crucial! ⚡\n\n**Key metrics (Core Web Vitals):**\n• **LCP**: Largest Contentful Paint < 2.5s\n• **FID**: First Input Delay < 100ms\n• **CLS**: Cumulative Layout Shift < 0.1\n\n**Optimization techniques:**\n• Image optimization (WebP, lazy loading)\n• Code splitting and lazy imports\n• Bundle analysis and tree shaking\n• Caching strategies",
  'optimization': "Here are key optimization strategies! 🚀\n\n**JavaScript:**\n• Use `React.memo()` for components\n• `useMemo()` for expensive calculations\n• `useCallback()` for function references\n• Code splitting with `React.lazy()`\n\n**Images:**\n• Use modern formats (WebP, AVIF)\n• Implement lazy loading\n• Responsive images with `srcset`\n• Optimize image sizes",
  
  // Next.js questions
  'nextjs': "Next.js is a powerful React framework! 🌟\n\n**Features:**\n• **App Router**: File-based routing\n• **SSR/SSG**: Server-side rendering\n• **API Routes**: Backend functionality\n• **Image Optimization**: Built-in optimization\n• **Performance**: Automatic optimizations\n\n**App Router structure:**\n```\napp/\n├── page.tsx       # Home page\n├── about/page.tsx # /about route\n└── blog/[slug]/page.tsx # Dynamic routes\n```",
  'routing': "Next.js App Router is file-based! 🗂️\n\n**Examples:**\n• `app/page.tsx` → `/`\n• `app/about/page.tsx` → `/about`\n• `app/blog/[slug]/page.tsx` → `/blog/react-tips`\n• `app/blog/[...slug]/page.tsx` → `/blog/2024/react`\n\n**Special files:**\n• `layout.tsx`: Shared layouts\n• `loading.tsx`: Loading UI\n• `error.tsx`: Error boundaries\n• `not-found.tsx`: 404 pages",
  
  // General questions
  'help': "I can help with many frontend topics! 🤝\n\n**Topics I cover:**\n• React (components, hooks, patterns)\n• TypeScript (types, interfaces, generics)\n• CSS (flexbox, grid, animations)\n• Next.js (routing, SSR, optimization)\n• Performance (Core Web Vitals, optimization)\n• JavaScript (ES6+, async/await, modules)\n\nJust ask about any of these topics!",
  'blog': "This blog covers modern frontend development! 📝\n\n**Recent topics:**\n• React patterns and performance\n• TypeScript best practices\n• CSS Grid and Flexbox mastery\n• Web performance optimization\n• State management comparison\n\nCheck out the blog posts above for detailed tutorials and examples!",
  'portfolio': "This is a showcase of modern frontend skills! 💼\n\n**Technologies used:**\n• Next.js 15 with App Router\n• React 19 with TypeScript\n• Tailwind CSS v4\n• Framer Motion animations\n• Supabase integration\n\nThe goal is to demonstrate professional frontend development capabilities!",
  
  // Default responses
  'default_code': "That looks like a code question! 💻 I'd be happy to help, but could you be more specific? For example:\n\n• 'How do I use useState?'\n• 'Explain CSS Grid'\n• 'Next.js routing help'\n• 'TypeScript interfaces'\n\nWhat specific topic would you like to explore?",
  'default_general': "Great question! 🤔 I specialize in frontend development topics like:\n\n• **React** & **Next.js**\n• **TypeScript** & **JavaScript**\n• **CSS** & **Styling**\n• **Performance** optimization\n• **Web development** best practices\n\nCould you ask about one of these areas? I'm here to help!",
  'unknown': "I'm not sure about that specific topic, but I'd love to help! 🤖\n\nTry asking about:\n• React concepts\n• CSS techniques\n• TypeScript questions\n• Performance tips\n• Next.js features\n\nOr type 'help' to see all topics I can assist with!"
}

function findBestResponse(input: string): string {
  const lowerInput = input.toLowerCase().trim()
  
  // Direct matches
  for (const [key, response] of Object.entries(botResponses)) {
    if (key !== 'default_code' && key !== 'default_general' && key !== 'unknown' && lowerInput.includes(key)) {
      return response
    }
  }
  
  // Check for code-related keywords
  const codeKeywords = ['function', 'const', 'let', 'var', 'import', 'export', 'class', 'interface', 'type', '=>', '{', '}', '()', 'jsx', 'tsx']
  if (codeKeywords.some(keyword => lowerInput.includes(keyword))) {
    return botResponses.default_code
  }
  
  // Check for general development terms
  const devKeywords = ['web', 'development', 'frontend', 'backend', 'website', 'application', 'code', 'programming']
  if (devKeywords.some(keyword => lowerInput.includes(keyword))) {
    return botResponses.default_general
  }
  
  // Default unknown response
  return botResponses.unknown
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your frontend development assistant! 🤖 Ask me about React, TypeScript, CSS, Next.js, or any web development topics. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = findBestResponse(inputValue)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // Random delay between 1-2 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-50 group"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <MessageCircle className="w-6 h-6" />
            
            {/* Pulse animation */}
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-600/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 ${
              isMinimized ? 'w-80 h-16' : 'w-80 h-96'
            }`}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="w-6 h-6" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Frontend Assistant</h3>
                  <p className="text-xs opacity-80">Always here to help!</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-64 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          message.sender === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-purple-600 text-white'
                        }`}>
                          {message.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                        </div>
                        <div className={`rounded-lg p-3 text-sm whitespace-pre-wrap ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white ml-2'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 mr-2'
                        }`}>
                          {message.content}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                animate={{ y: [0, -4, 0] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about React, CSS, TypeScript..."
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                      disabled={isTyping}
                    />
                    <motion.button
                      onClick={sendMessage}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!inputValue.trim() || isTyping}
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}