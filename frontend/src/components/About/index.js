import angelList from '../../assets/icons/angellist-svgrepo-com.svg'
import gitHub from '../../assets/icons/iconmonstr-github-1.svg'
import linkedIn from '../../assets/icons/iconmonstr-linkedin-3.svg'
import './about.css'

const AboutSite = () => {

    return (
        <div className="about">
            <div>About</div>
            <div>
                <p>Hello! Welcome to BnB.</p>
                <p>This was created by Richard Kwon and this is my first fullstack application.</p>
                <p>Please feel free to reach out to me via the links below with any comments or suggestions!</p>
            </div>
            <div>
                    <a href="https://angel.co/u/richard-kwon-6" target="_blank" rel="noreferrer"><img className="angel-list" id="page-one-icons" src={angelList} alt=""/></a>
                    <a href="https://github.com/Ykk2" target="_blank" rel="noreferrer"><img className="git-hub" id="page-one-icons" src={gitHub} alt=""/></a>
                    <a href="https://www.linkedin.com/in/richardkwon2" target="_blank" rel="noreferrer"><img className="linked-in" id="page-one-icons" src={linkedIn} alt=""/></a>
            </div>
        </div>
    )
}


export default AboutSite
