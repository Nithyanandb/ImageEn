import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "5 AI image generations per day",
        "Basic video enhancement",
        "720p upscaling",
        "Standard processing speed"
      ]
    },
    {
      name: "Pro",
      price: "$19/month",
      features: [
        "Unlimited AI image generations",
        "Advanced video enhancement",
        "4K upscaling",
        "Priority processing",
        "Style transfer",
        "Batch processing"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Everything in Pro",
        "API access",
        "Custom AI model training",
        "Dedicated support",
        "SLA guarantee"
      ]
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-serif text-gray-900 mb-12 text-center">Choose Your Plan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow relative ${
                plan.popular ? 'ring-2 ring-gray-900' : ''
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-serif text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-6">{plan.price}</p>
              <ul className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-gray-600">
                    <Check className="w-5 h-5 text-gray-900" />
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0 }}
                className={`w-full mt-8 py-3 rounded-xl font-medium transition-colors ${
                  plan.popular
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};