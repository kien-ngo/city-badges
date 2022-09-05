import { useRouter } from "next/router"
import Container from "../components/Container"
import styles from '../styles/Asset.module.css'

const AssetPage = () => {
    const router = useRouter()
    const {tokenId} = router.query
    return <Container>
        <div className={styles.Container}>

        </div>
    </Container>
}

export default AssetPage