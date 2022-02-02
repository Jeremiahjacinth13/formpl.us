import InfoCircleIcon from '../assets/icons/infocircle'
import './styles/banner.css'

export const Banner: React.FC = () => {
  return (
    <div className="banner__container">
      <InfoCircleIcon />
      <p>
        Tada! Get started with a free template. Can’t find what you are looking
        for? Search from the 1000+ available templates
      </p>
    </div>
  )
}
