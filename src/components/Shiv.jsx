import React from 'react';

const FeatureCards = () => {
  const features = [
    {
      number: "01",
      title: "About Us",
      description: "Shivinfotech is one of Indian leading companies in the field of Web Development and Designing Company. The company offers a large variety of services, including research, development and technological works automation, distribution, development and system integration of software and hardware",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H6v-2h6v2zm4-4H6v-2h10v2zm0-4H6V7h10v2z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Our Vision",
      description: "The vision at Shivinfotech, is of a highly trained and efficient team of Web/Software Development and customer service personnel, ready for anything that may occur and quick to respond to customer needs and concerns.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="m24,6.928v13.072h-11.5v3h5v1H6.5v-1h5v-3H0V4.5c0-1.379,1.122-2.5,2.5-2.5h12.98c-.253.295-.54.631-.856,1H2.5c-.827,0-1.5.673-1.5,1.5v14.5h22v-10.993l1-1.079Z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Our Mission",
      description: "At Shivinfotech every person in our company is a member of the team and a team player, with the expectation and need that they perform their duties to their fullest capacity and potential. Our objective is a commitment to the highest quality and customer service. The client satisfaction is our main focus, reached through innovative and cost effective security services. We will lead the IT industry in trained officers and rapid customer service.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.9 5c-.2 0-.3 0-.4.1-.1.1-.2.2-.2.3v13.2c0 .1.1.3.2.3.1.1.3.1.4.1.1 0 .3 0 .4-.1.1-.1.2-.2.2-.3V5.4c0-.1-.1-.3-.2-.3-.2-.1-.3-.1-.4-.1zm3.8 2.4c-.2 0-.3 0-.4.1-.1.1-.2.2-.2.3v8.4c0 .1.1.3.2.3.1.1.3.1.4.1.1 0 .3 0 .4-.1.1-.1.2-.2.2-.3V7.8c0-.1-.1-.3-.2-.3-.2-.1-.3-.1-.4-.1zM8.3 10c-.2 0-.3 0-.4.1-.1.1-.2.2-.2.3v8.2c0 .1.1.3.2.3.1.1.3.1.4.1.1 0 .3 0 .4-.1.1-.1.2-.2.2-.3v-8.2c0-.1-.1-.3-.2-.3-.2-.1-.3-.1-.4-.1zm3.8-2.4c-.2 0-.3 0-.4.1-.1.1-.2.2-.2.3v13.2c0 .1.1.3.2.3.1.1.3.1.4.1.1 0 .3 0 .4-.1.1-.1.2-.2.2-.3V8c0-.1-.1-.3-.2-.3-.2-.1-.3-.1-.4-.1z" />
        </svg>
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 mt-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="w-full bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden"
          >
            {/* Circle with number */}
            <div className="w-24 h-24 bg-violet-500 rounded-full absolute -right-5 -top-7">
              <p className="absolute bottom-6 left-7 text-white text-2xl">
                {feature.number}
              </p>
            </div>

            {/* Icon */}
            <div className="fill-violet-500 w-12">
              {feature.icon}
            </div>

            {/* Content */}
            <h1 className="font-bold text-xl">
              {feature.title}
            </h1>
            <p className="text-sm text-zinc-500 leading-6">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;