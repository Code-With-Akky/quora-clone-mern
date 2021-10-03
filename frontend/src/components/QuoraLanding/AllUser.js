import React from 'react'
import './AllUsers.css'
import QHeader from './QHeader'

function AllSpaces() {
    return (<>
        <QHeader />
        <div className = 'allUser'>
            <div className = 'allUser-container'>
                <img width = {250} src = 'https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.build_following_feed_darkmode.png-26-3fb93e1da358eb6e.png' alt = ''/>
                <h4>Build your new following feed</h4>
                <p>Follow some Spaces to start discovering stories in you feed</p>
            </div>
            <div className = 'allUser-content'>
                <h3>Discover Spaces</h3>
                <div className = 'allUser-space'>
                    <p>Spaces you might like</p>
                </div>
                <div className = 'allUsers'>
                    <div className = 'allUserStrip'>
                        <img src = 'https://qphs.fs.quoracdn.net/main-thumb-ti-1945362-100-rwsfgpahztatgtaybdknosepkylwwgkg.jpeg' alt ='' />
                        <div className = 'content'>
                            <p>Teens😂😂 l💓ve</p>
                            <small>14K followers</small>
                            <small>fun 🤣🤣 to make life happy....💓😘😘💓</small>
                        </div>
                    </div>
                    <div className = 'allUserStrip'>
                        <img src = 'https://qphs.fs.quoracdn.net/main-thumb-ti-1809935-100-ugjjcbtagepmjzxqewjucdlbghbyvzuf.jpeg' alt ='' />
                        <div className = 'content'>
                            <p>Xavier memes</p>
                            <small>48.5K followers</small>
                            <small>This space only for fun based 😀😁😎 by professor xavier</small>
                        </div>
                    </div>
                    <div className = 'allUserStrip'>
                        <img src = 'https://qphs.fs.quoracdn.net/main-thumb-ti-1586937-100-eacomyyoiwvapnorsknliswmngvehjly.jpeg' alt ='' />
                        <div className = 'content'>
                            <p>The Intelligent Investor</p>
                            <small>137.2K followers</small>
                            <small>Everything About Stock Market & Finance.</small>
                        </div>
                    </div>
                    <div className = 'allUserStrip'>
                        <img src = 'https://qphs.fs.quoracdn.net/main-thumb-ti-1584606-100-sjkcfqlnozgrkematzadgnjkhmrgrntm.jpeg' alt ='' />
                        <div className = 'content'>
                            <p>Spiritual Thought</p>
                            <small>12.7K followers</small>
                            <small>If you are interested in Beyond the physical world then you are most welcome!</small>
                        </div>
                    </div>
                    <div className = 'allUserStrip'>
                        <img src = 'https://qphs.fs.quoracdn.net/main-thumb-ti-1932347-100-zmrqrduiusnaxdjolxgirondyjupjrke.jpeg' alt ='' />
                        <div className = 'content'>
                            <p>Laughter Society</p>
                            <small>13.3K followers</small>
                            <small>😆Trolls || 😂Sarcasm || 😁Humor || 🤩Comic Let's make you Laugh.</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default AllSpaces
