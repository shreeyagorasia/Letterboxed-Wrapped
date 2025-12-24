def generate_narrative(stats: dict) -> list[dict]:
    """
    Turn computed stats into Wrapped-style narrative statements.
    Returns a list of narrative blocks (text + type metadata).
    """

    narratives = []

    year = stats.get("year", "2025")

    # --------------------------------------------------
    # Opening headline
    # --------------------------------------------------
    total_movies = stats.get("counts", {}).get("diary_rows", 0)

    if total_movies > 0:
        narratives.append({
            "type": "headline",
            "text": f"You watched {total_movies} movies in {year} 🎬"
        })

        # Relative framing (psychological boost)
        if total_movies >= 100:
            narratives.append({
                "type": "comparison",
                "text": "Most people watch around 50 movies a year. You doubled that."
            })
        elif total_movies >= 60:
            narratives.append({
                "type": "comparison",
                "text": "You watched more movies than the average viewer this year."
            })

    # --------------------------------------------------
    # Favourite genre
    # --------------------------------------------------
    genre_identity = stats.get("genre_identity", {})
    top_genre = genre_identity.get("top_genre")

    if top_genre:
        pct = genre_identity.get("top_genre_percentage")
        if pct:
            narratives.append({
                "type": "genre",
                "text": f"{top_genre} dominated your year ({pct}% of your films)."
            })
        else:
            narratives.append({
                "type": "genre",
                "text": f"{top_genre} was your most-watched genre."
            })

    # --------------------------------------------------
    # Runtime commitment
    # --------------------------------------------------
    runtime = stats.get("runtime", {})
    total_hours = runtime.get("total_hours")

    if total_hours:
        narratives.append({
            "type": "runtime",
            "text": f"You spent {total_hours} hours watching movies this year."
        })

    # --------------------------------------------------
    # Busiest month
    # --------------------------------------------------
    busiest = stats.get("busiest_month", {})
    month = busiest.get("busiest_month")
    count = busiest.get("movies_watched")

    if month and count:
        narratives.append({
            "type": "time",
            "text": f"{month} was your busiest month — {count} movies watched."
        })

    # --------------------------------------------------
    # Consistency / habit
    # --------------------------------------------------
    active_months = stats.get("consistency", {}).get("active_months")

    if active_months:
        if active_months >= 10:
            narratives.append({
                "type": "habit",
                "text": "You watched movies consistently all year long."
            })
        elif active_months >= 6:
            narratives.append({
                "type": "habit",
                "text": "You dipped in and out of movies throughout the year."
            })
        else:
            narratives.append({
                "type": "habit",
                "text": "You had a few intense movie phases this year."
            })

    # --------------------------------------------------
    # Peak binge day (optional stat)
    # --------------------------------------------------
    binge = stats.get("binge", {})
    peak_day = binge.get("peak_day_count")

    if peak_day and peak_day >= 3:
        narratives.append({
            "type": "binge",
            "text": f"You had at least one movie-heavy day where you watched {peak_day} films back to back."
        })

    # --------------------------------------------------
    # Rewatches / comfort viewing
    # --------------------------------------------------
    rewatches = stats.get("rewatches", {})
    if rewatches.get("rewatch_count", 0) > 0:
        narratives.append({
            "type": "rewatch",
            "text": f"You rewatched {rewatches['rewatch_count']} movies — comfort viewing at its finest."
        })

    comfort = stats.get("comfort_movies", {})
    if comfort.get("count", 0) > 0 and comfort.get("movies"):
        top_comfort = comfort["movies"][0]
        narratives.append({
            "type": "comfort",
            "text": f"Your ultimate comfort movie was {top_comfort['title']}."
        })

    # --------------------------------------------------
    # Rating personality
    # --------------------------------------------------
    rating = stats.get("rating_personality", {})
    persona = rating.get("persona")
    avg_rating = rating.get("average_rating")

    if persona:
        if avg_rating:
            narratives.append({
                "type": "rating",
                "text": f"You were a {persona.lower()} — your average rating was {avg_rating}⭐."
            })
        else:
            narratives.append({
                "type": "rating",
                "text": f"You were a {persona.lower()} this year."
            })

    # --------------------------------------------------
    # Taste confidence (distribution-based)
    # --------------------------------------------------
    distribution = rating.get("distribution", {})
    total_ratings = sum(distribution.values()) if distribution else 0

    if total_ratings >= 10:
        high = sum(v for k, v in distribution.items() if float(k) >= 4.0)
        low = sum(v for k, v in distribution.items() if float(k) <= 2.5)

        if high / total_ratings > 0.5:
            narratives.append({
                "type": "taste",
                "text": "You knew exactly what you liked — lots of high ratings this year."
            })
        elif low / total_ratings > 0.4:
            narratives.append({
                "type": "taste",
                "text": "You were hard to impress — few movies truly won you over."
            })
        else:
            narratives.append({
                "type": "taste",
                "text": "Your taste was eclectic, with ratings spread across the spectrum."
            })

    # --------------------------------------------------
    # Top-rated movie (optional future stat)
    # --------------------------------------------------
    top_movie = stats.get("top_rated_movie")
    if top_movie:
        narratives.append({
            "type": "top_movie",
            "text": f"Your highest-rated movie this year was {top_movie['title']} ⭐⭐⭐⭐⭐."
        })

    # --------------------------------------------------
    # Genre mood shift (optional future stat)
    # --------------------------------------------------
    mood_shift = stats.get("genre_mood_shift")
    if mood_shift:
        narratives.append({
            "type": "genre_shift",
            "text": mood_shift
        })

    # --------------------------------------------------
    # Watchlist teaser
    # --------------------------------------------------
    watchlist_size = stats.get("watchlist", {}).get("items_in_watchlist", 0)

    if watchlist_size > 0:
        narratives.append({
            "type": "watchlist",
            "text": f"You ended the year with {watchlist_size} movies still on your watchlist."
        })

    # --------------------------------------------------
    # Closing line
    # --------------------------------------------------
    narratives.append({
        "type": "closing",
        "text": "That was your movie year. Ready to do it all again next year?"
    })

    return narratives
