import React from 'react';

function Home() {
    return (
        <div>
            <h1>Welcome to Nerdino!</h1>
            <p>This is a single-page application built using .Net Core and React.</p>
            <p>Good luck with your test. When you are done don't forget to remove the node_modules foler, zip the entire solution folder, and send it back.</p>
            <p>Here are some additional resources to help you in your journey:</p>
            <ul>
                <li><a href='https://get.asp.net/' target="_blank" rel="noopener noreferrer">ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx' target="_blank" rel="noopener noreferrer">C#</a> for cross-platform server-side code</li>
                <li><a href='https://reactjs.org/' target="_blank" rel="noopener noreferrer">React</a> for client-side code</li>
                <li><a href='https://getbootstrap.com/docs/4.4/getting-started/introduction/' target="_blank" rel="noopener noreferrer">Bootstrap 4.3.1</a></li>
            </ul>
        </div>
    );
}

export default Home;
