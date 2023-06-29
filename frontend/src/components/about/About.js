import React from 'react';
import "./About.css"

export const About = () => {
  return (
    <div className="container minH mt-2">
      <h2>About</h2>
      <p>
        This website provides information about all upcoming and ongoing coding contests listed on various coding platforms like CodeForces, CodeChef, LeetCode, etc. It displays the contest link, starting time, ending time, and duration for each contest.
      </p>
      <p>
        Additionally, registered users can enjoy the email notification functionality. Users can select a notification time for each coding platform. If there is any contest on the selected platform, the site will inform the user via email at the chosen time before the start of the contest.
      </p>
    </div>
  );
};
