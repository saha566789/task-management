import Footer from "../Home/Footer";


const Faq = () => {
    return (
     <div>
           <div className="py-16">
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" checked="checked" />
                <div className="collapse-title text-xl font-medium">
                1.What is a Task Management System?
                </div>
                <div className="collapse-content">
                    <p>A Task Management System is a tool or software used to manage tasks efficiently. It helps in organizing, prioritizing, tracking, and executing tasks, often in a collaborative environment.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                2.Who can benefit from a Task Management System?
                </div>
                <div className="collapse-content">
                    <p>Anyone from individuals working on personal projects to teams in small businesses or large enterprises can benefit. It's particularly useful for project managers, team leaders, and members of collaborative teams.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
               3.How does a Task Management System help in project management?
                </div>
                <div className="collapse-content">
                    <p>It assists in breaking down projects into manageable tasks, setting deadlines, assigning responsibilities, tracking progress, and facilitating communication among team members.</p>
                </div>
            </div>
            
        </div>
        <Footer></Footer>
     </div>
    );
};

export default Faq;