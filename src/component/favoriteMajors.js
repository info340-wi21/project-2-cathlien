import favoriteList from './favoriteList'

export function favoriteMajors() {
    return (
        <div className="container">
            <div className="card-columns">
                {favoriteList}
            </div>
        </div>
    )
}