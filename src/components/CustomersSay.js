import React from "react";

const CustomersSay = () => {
  // Sample customer data with reviews
  const testimonials = [
    {
      id: 1,
      name: "Michael Chen",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review:
        "Little Lemon has become our go-to restaurant! The bruschetta is to die for, and the lemon dessert is the perfect ending to any meal. Highly recommend!",
      location: "Chicago, IL",
    },
    {
      id: 2,
      name: "Emily Rodriguez",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      review:
        "Wonderful Mediterranean cuisine! The flavors are authentic and the presentation is beautiful. The staff is friendly and knowledgeable about the menu.",
      location: "Chicago, IL",
    },
    {
      id: 3,
      name: "David Thompson",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review:
        "Outstanding food and service! The family-owned atmosphere really shows in the quality of the dishes. The restaurant food platter was perfect for sharing with friends.",
      location: "Chicago, IL",
    },
  ];

  // Function to render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? "filled" : "empty"}`}
      >
        ⭐
      </span>
    ));
  };

  return (
    <>
      {/* Testimonials */}
      <section className="testimonials" aria-label="Customer Testimonials">
        <div className="testimonials-container">
          <h2 className="section-title">Testimonials</h2>
          <p className="testimonials-subtitle">
            Don't just take our word for it - hear from our satisfied customers
          </p>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <article key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name} profile`}
                    className="customer-avatar"
                  />
                  <div className="customer-info">
                    <h3 className="customer-name">{testimonial.name}</h3>
                    <p className="customer-location">{testimonial.location}</p>
                  </div>
                </div>
                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>
                <blockquote className="testimonial-review">
                  <p>"{testimonial.review}"</p>
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomersSay;
