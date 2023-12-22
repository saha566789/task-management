

const Faq = () => {
    return (
        <div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" checked="checked" />
                <div className="collapse-title text-xl font-medium">
                Developers
                </div>
                <div className="collapse-content">
                    <p>Developers use programming and design knowledge to build software that meets the needs of users. Typically, they will meet with a client who has a need for software to be developed, and then will build, test and deploy that software based on the specifications they have received.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                Corporate professionals
                </div>
                <div className="collapse-content">
                    <p>
Corporate Professional means employees who are employed at Corporate Professional Levels A, B or C. " Corporate Administrative" means employees who are employed at Corporate Administrative Levels 1 to 4.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    Banker
                </div>
                <div className="collapse-content">
                    <p> He is an individual who performs the banking work consisting of accepting deposits, lending cash, taking flight facilities, and changing cash, referred to as a banker. In other words, the individual that is immediately associated with the banking company is known as a banker.</p>
                </div>
            </div>
        </div>
    );
};

export default Faq;