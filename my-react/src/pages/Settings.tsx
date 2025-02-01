import React from "react";

const Settings: React.FC = () => {
    return (
        <div className="mainblock responsive-container-block bigContainer">
      <div className="responsive-container-block Container">
        <div className="responsive-container-block leftSide">
          <p className="text-blk heading">Meet Our Creative Team</p>
          <p className="text-blk subHeading">
            Semaj Africa is an online education platform that delivers video courses, programs and resources for
            Individual, Advertising & Media Specialist, Online Marketing Professionals, Freelancers and anyone looking
            to pursue a career in digital marketing, Accounting, Web development, Programming, Multimedia and CAD
            design.
          </p>
        </div>
        <div className="imageuuu responsive-container-block rightSide">
          <img className="number1img" src="https://i.guim.co.uk/img/media/d059b58efe8ce50d15639f76448becdeec69bc9b/0_184_7200_4320/master/7200.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=cdb5298773baf69c080a77c757fd6c08" alt="Team member 1" />
          <img className="number2img" src="https://cdn.prod.website-files.com/5f2b1efb0f881760ffdc5c96/63c12849a1c7e9df64c819fc_programming-languages-shutterstock-1680857539.webp" alt="Team member 2" />
          <img className="number3img" src="https://cdn3.f-cdn.com/files/download/97941784/programmin.jpg?image-optimizer=force&format=webply&width=967" alt="Team member 3" />
          <img className="number5img" src="https://images.prismic.io/turing/652ebf73fbd9a45bcec818b7_functional_programming_44edc8e7a1.webp?auto=format,compress" alt="Customer support" />
          <iframe
            allowFullScreen
            className="number4vid"
            src="https://www.youtube.com/embed/svg%3E?"
            title="Team Video"
          />
          <img className="number7img" src="https://www.totaltek.com/wp-content/uploads/2022/01/Computer-Programming-Languages.jpg" alt="Team member 4" />
          <img className="number6img" src="https://www.thoughtco.com/thmb/aS6zMjpwJyEsyMUBRLAq7cNkENE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/warning--data-transfer-in-progress-507065943-59c6d2a70d327a001141794d-5bb792f246e0fb0051a88f9c.jpg" alt="Team member 5" />
        </div>
      </div>
      
    </div>
    
    );
};

export default Settings;