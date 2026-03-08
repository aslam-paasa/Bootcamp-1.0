import { useState, useEffect } from "react"
import './Body.css'

export function Body() {
    /**
     * 3. Fetched data from Github API will be stored here
    */
    const [profile, setProfile] = useState([])
    const [searchValue, setSearchValue] = useState('')

    /**
     * 2. Fetch data from Github API
    */
    async function fetchProfile(count) {
        // Only fetch if count is provided
        if (!count) return;

        const random = Math.floor(1 + Math.random() * 1000000);

        try {
            const response = await fetch(`https://api.github.com/users?since=${random}&per_page=${count}`)
            const data = await response.json()
            setProfile(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 1. Call fetchProfile() when the component is mounted
     * Removed initial fetch on mount since we want user input first
    */
    useEffect(() => {
        fetchProfile(Number(searchValue));
    }, [])

    /**
     * 4. Display the data in the UI
    */
    return (
        <div>
            {/* Input Field, Search Button */}
            <div className="search-container">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Enter number of profiles"
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)} 
                />
                <button onClick={() => fetchProfile(Number(searchValue))}>Search Profiles</button>
            </div>

            {/* Profile Cards */}
            <div className="profile-container">
                {profile.map((profile) => (
                    <div key={profile.id} className="profile-card">
                        <img src={profile.avatar_url} alt={profile.login} />
                        <h1>{profile.login}</h1>
                        <a href={profile.html_url} target="_blank" className="profile-link">Profile</a>
                    </div>
                ))}
            </div>
        </div>
    )
}