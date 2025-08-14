'use client'

import { motion } from 'framer-motion'
import { FileText, Eye, Calendar, TrendingUp } from 'lucide-react'

interface AdminStatsProps {
  stats: {
    totalPosts: number
    published: number
    drafts: number
    totalViews: number
  }
}

export function AdminStats({ stats }: AdminStatsProps) {
  const statItems = [
    {
      label: 'Total Posts',
      value: stats.totalPosts,
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      label: 'Published',
      value: stats.published,
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      label: 'Drafts',
      value: stats.drafts,
      icon: FileText,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      label: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden group cursor-pointer"
        >
          {/* Background Gradient */}
          <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.color} opacity-10 rounded-full transform translate-x-6 -translate-y-6 group-hover:scale-110 transition-transform duration-300`} />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${item.bgColor} rounded-xl`}>
                <item.icon className={`w-6 h-6 ${item.textColor}`} />
              </div>
              
              {/* Trend Indicator */}
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500 font-medium">+12%</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {item.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {item.label}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>This month</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Hover Effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        </motion.div>
      ))}
    </motion.div>
  )
}