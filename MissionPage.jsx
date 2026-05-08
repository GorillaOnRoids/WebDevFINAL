import React, { useState, useEffect } from 'react';
import './App.css';

const farmSlides = [
    {
        left: {
            url: 'https://i0.wp.com/mwvvibe.com/wp-content/uploads/2020/07/Farm_watering0072.jpg?resize=1280%2C640&ssl=1',
            caption: 'Sunrise valley farm tour',
        },
        right: {
            url: 'https://images.squarespace-cdn.com/content/v1/58937cddf7e0ab922f099fe0/1495132143104-GPO4MTKAPHD3QKRVAA2B/image-asset.jpeg',
            caption: 'Barnyard mornings at the Washington Valley farm',
        },
    },
    {
        left: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFrGyb6WTiw3wt-FTI587xGUCvPDog6qa-mg&s',
            caption: 'Fresh harvest from rolling fields',
        },
        right: {
            url: 'https://us.123rf.com/450wm/clinweaver/clinweaver1912/clinweaver191200238/137512835-strasburg-pennsylvania-august-26-2019-amish-men-harvesting-corn-with-a-horse-drawn-harvester.jpg?ver=6',
            caption: 'Cedar Grove - 1989',
        },
    },
    {
        left: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA7D12-baaBAxl_VyboSJj-EiVNz5QlXHz7w&s',
            caption: 'Local beekeepers buzzing with flavor',
        },
        right: {
            url: 'https://i.ytimg.com/vi/Xt0EePMl8oM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBBBbqNpPpRrzNkkCfz1VGXyDDMGw',
            caption: 'Spring Harvest at the Old Mill Farm',
        },
    },
];

function MissionPage() {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setSlideIndex((current) => (current + 1) % farmSlides.length);
        }, 10000);

        return () => window.clearInterval(timer);
    }, []);

    const currentSlide = farmSlides[slideIndex];

    return (
        <main className="main-container">
            <section className="mission-layout">
                <aside className="farm-carousel side-carousel left-carousel">
                    <div className="carousel-card">
                        <img
                            src={`${currentSlide.left.url}&auto=format&fit=crop`}
                            alt={currentSlide.left.caption}
                            className="carousel-image"
                        />
                        <div className="carousel-caption">{currentSlide.left.caption}</div>
                    </div>
                </aside>

                <div className="mission-content">
                    <div className="mission-header">
                        <h1>Our Mission</h1>
                        <p>
                            At Fig&apos;s Produce, we believe great food starts close to home. We partner with small local farms,
                            family growers, and sustainable producers to bring the freshest, most flavorful produce directly to your table.
                        </p>
                    </div>

                    <div className="mission-copy">
                        <p>
                            Our mission is to celebrate the farmers and the land behind every apple, carrot, and leafy green. We prioritize
                            locally sourced ingredients, reducing food miles and supporting the people who cultivate the food we love.
                        </p>
                        <p>
                            Whether it&apos;s a bright market tomato, crisp lettuce, or pasture-raised dairy, every item on our site is chosen
                            with care so your meals taste better and your community grows stronger.
                        </p>
                        <p>
                            By choosing local, you help keep farm families thriving, protect our regional ecosystem, and enjoy produce
                            that is fresher than anything shipped from far away.
                        </p>
                    </div>
                </div>

                <aside className="farm-carousel side-carousel right-carousel">
                    <div className="carousel-card">
                        <img
                            src={`${currentSlide.right.url}&auto=format&fit=crop`}
                            alt={currentSlide.right.caption}
                            className="carousel-image"
                        />
                        <div className="carousel-caption">{currentSlide.right.caption}</div>
                    </div>
                </aside>
            </section>
        </main>
    );
}

export default MissionPage;
