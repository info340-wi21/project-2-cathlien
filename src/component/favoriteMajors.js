import favoriteList from './favoriteList'

export function FavoriteMajors() {
    return (
        <div className="container">
            <div className="card-columns">
                {favoriteList}
            </div>
        </div>
    )
}