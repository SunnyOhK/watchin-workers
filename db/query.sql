-- ! AAAAAAAAAAAAAAGGGGGHHHHHHHHHHHHHHHHHHHHHHHHH

SELECT department.dept_name AS department, reviews.review
FROM reviews
LEFT JOIN movies
ON reviews.movie_id = movies.id
ORDER BY movies.movie_name;