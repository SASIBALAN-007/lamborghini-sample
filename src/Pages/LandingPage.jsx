import Navbar from "../Components/LandingPage/Navbar"
import HeroSection from "../Components/LandingPage/HeroSection"
import Models from "../Components/LandingPage/Models"
import Configurator from "../Components/Configuration/Configurator"
import Banner from "../Components/LandingPage//Banner"
import Footer from "../Components/LandingPage/Footer"
function LandingPage() {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <Models />
            <Configurator />
            <Banner />
            <Footer />
        </div>
    )
}

export default LandingPage