// Working code with div class changes 
import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 

export default function App() {
    const [movie, setMovie] = useState('');
    const [location, setLocation] = useState('');
    const [budget, setBudget] = useState('');
    const [days, setDays] = useState('');
    const [nights, setNights] = useState('');
    const [itinerary, setItinerary] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://perplexity-hackathon.onrender.com/api/itinerary/generate', {
                movie,
                location,
                budget,
                days,
                nights
            });
            setItinerary(response.data.itinerary);
        } catch (error) {
            console.error('Error fetching itinerary:', error);
            alert('Failed to fetch itinerary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Navbar */}
            <header className="w-full bg-slate-100 shadow-md fixed top-0 left-0 z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-blue-700">🎬 MovieMood</h1>
                    <nav className="space-x-6">
                        <a href="#home" className="text-blue-700 hover:text-blue-500 font-medium">Home</a>
                        <a href="#features" className="text-blue-700 hover:text-blue-500 font-medium">Features</a>
                        <a href="#search" className="text-blue-700 hover:text-blue-500 font-medium">Plan Trip</a>
                        <a href="#itinerary" className="text-blue-700 hover:text-blue-500 font-medium">Itinerary</a>
                    </nav>
                </div>
            </header>

            <main className="pt-[72px] font-sans text-black w-full overflow-hidden">
                {/* Hero Section */}
                <section id="home" className="relative w-full h-screen">
                    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                        <source src="/assests/hero5.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="relative z-10 w-full h-full flex justify-center items-center">
                        <h2 className="text-white text-4xl font-extrabold">Lights Camera... Vacation</h2>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 bg-black text-white">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full px-4 md:px-16">

                        {[{
                            video: 'feature1.mp4',
                            title: 'AI-Powered Trips',
                            desc: 'Let AI craft unique, personalized travel itineraries based on the plot, theme, and vibe of your favorite movies.'
                        }, {
                            video: 'feature2.mp4',
                            title: 'Movie Matching',
                            desc: 'Automatically identify and suggest real-world filming locations based on your chosen movie.'
                        }, {
                            video: 'feature3.mp4',
                            title: 'Real Destinations',
                            desc: 'Discover iconic places that appear in films and get travel-ready routes to visit them in person.'
                        }, {
                            video: 'feature4.mp4',
                            title: 'Instant Planning',
                            desc: 'Generate full trip plans in seconds with live API-powered insights from Perplexity Sonar.'
                        }].map((feature, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <video autoPlay loop muted playsInline className="rounded-xl shadow-lg w-full h-64 object-cover mb-4">
                                    <source src={`/assests/videos/${feature.video}`} type="video/mp4" />
                                </video>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-center text-gray-300 max-w-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Search Section */}
                <section id="search" className="py-20 bg-gray-100 text-black w-full">
                    <div className="w-full px-4 text-center">
                    {/* <div className="w-full px-4 text-center"> */}

                        <h2 className="text-3xl font-bold mb-6">Search Your Movie Mood</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="Movie 🎥" value={movie} onChange={(e) => setMovie(e.target.value)} required className="w-full p-3 rounded-md border" />
                            <input type="text" placeholder="Location 📍" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-3 rounded-md border" />
                            <input type="text" placeholder="Budget (in local currency of visiting country) 💰" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full p-3 rounded-md border" />
                            <input type="number" placeholder="Days ☀️" value={days} onChange={(e) => setDays(e.target.value)} className="w-full p-3 rounded-md border" />
                            <input type="number" placeholder="Nights 🌙" value={nights} onChange={(e) => setNights(e.target.value)} className="w-full p-3 rounded-md border" />
                            <button type="submit" className="bg-gradient-to-r from-purple-700 to-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-md">
                                {loading ? 'Generating...' : 'Generate Itinerary'}
                            </button>
                        </form>
                    </div>
                </section>

                {/* Enhanced Itinerary Section */}
                <section id="itinerary" className="py-20 bg-gradient-to-b from-white to-blue-50 text-black w-full">
                    <div className="w-full px-4 text-center">
                        <h2 className="text-3xl font-extrabold text-blue-800 mb-10 tracking-wide">Your Travel Itinerary</h2>
                        {itinerary ? (
                            <div className="prose prose-lg prose-blue max-w-none mx-auto text-left bg-white rounded-lg p-6 shadow-lg">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        h3: ({ node, ...props }) => <h3 className="text-2xl font-bold text-purple-700 mt-10 mb-4" {...props} />,
                                        p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                                        table: ({ node, ...props }) => <table className="table-auto border-collapse border border-gray-300 w-full my-8 shadow-md" {...props} />,
                                        th: ({ node, ...props }) => <th className="border border-gray-300 px-4 py-2 bg-purple-200 text-black font-bold" {...props} />,
                                        td: ({ node, ...props }) => <td className="border border-gray-300 px-4 py-2" {...props} />,
                                        hr: () => <hr className="my-8 border-t-2 border-blue-300" />,
                                    }}
                                >
                                    {itinerary.replace(/\| *Item\/Day *\|[\s\S]*?\| *Total *\|/g, '')}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <p className="text-gray-500 mt-6">No itinerary generated yet. Please fill out the form above.</p>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}

































// CC

// // Working code with div class changes 
// import React, { useState } from 'react';
// import axios from 'axios';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm'; 

// export default function App() {
//     const [movie, setMovie] = useState('');
//     const [location, setLocation] = useState('');
//     const [budget, setBudget] = useState('');
//     const [days, setDays] = useState('');
//     const [nights, setNights] = useState('');
//     const [itinerary, setItinerary] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const response = await axios.post('https://perplexity-hackathon.onrender.com/api/itinerary/generate', {
//                 movie,
//                 location,
//                 budget,
//                 days,
//                 nights
//             });
//             setItinerary(response.data.itinerary);
//         } catch (error) {
//             console.error('Error fetching itinerary:', error);
//             alert('Failed to fetch itinerary. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             {/* Navbar */}
//             <header className="w-full bg-slate-100 shadow-md fixed top-0 left-0 z-50">
//                 <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//                     <h1 className="text-xl font-bold text-blue-700">🎬 MovieMood</h1>
//                     <nav className="space-x-6">
//                         <a href="#home" className="text-blue-700 hover:text-blue-500 font-medium">Home</a>
//                         <a href="#features" className="text-blue-700 hover:text-blue-500 font-medium">Features</a>
//                         <a href="#search" className="text-blue-700 hover:text-blue-500 font-medium">Plan Trip</a>
//                         <a href="#itinerary" className="text-blue-700 hover:text-blue-500 font-medium">Itinerary</a>
//                     </nav>
//                 </div>
//             </header>

//             <main className="pt-[72px] font-sans text-black w-full overflow-hidden">
//                 {/* Hero Section */}
//                 <section id="home" className="relative w-full h-screen">
//                     <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
//                         <source src="/assests/hero5.mp4" type="video/mp4" />
//                         Your browser does not support the video tag.
//                     </video>
//                     <div className="relative z-10 w-full h-full flex justify-center items-center">
//                         <h2 className="text-white text-4xl font-extrabold">Lights Camera... Vacation</h2>
//                     </div>
//                 </section>

//                 {/* Features Section */}
//                 <section id="features" className="py-20 bg-black text-white">
//                     <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full px-4 md:px-16">

//                         {[{
//                             video: 'feature1.mp4',
//                             title: 'AI-Powered Trips',
//                             desc: 'Let AI craft unique, personalized travel itineraries based on the plot, theme, and vibe of your favorite movies.'
//                         }, {
//                             video: 'feature2.mp4',
//                             title: 'Movie Matching',
//                             desc: 'Automatically identify and suggest real-world filming locations based on your chosen movie.'
//                         }, {
//                             video: 'feature3.mp4',
//                             title: 'Real Destinations',
//                             desc: 'Discover iconic places that appear in films and get travel-ready routes to visit them in person.'
//                         }, {
//                             video: 'feature4.mp4',
//                             title: 'Instant Planning',
//                             desc: 'Generate full trip plans in seconds with live API-powered insights from Perplexity Sonar.'
//                         }].map((feature, idx) => (
//                             <div key={idx} className="flex flex-col items-center">
//                                 <video autoPlay loop muted playsInline className="rounded-xl shadow-lg w-full h-64 object-cover mb-4">
//                                     <source src={`/assests/videos/${feature.video}`} type="video/mp4" />
//                                 </video>
//                                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                                 <p className="text-center text-gray-300 max-w-sm">{feature.desc}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* Search Section */}
//                 <section id="search" className="py-20 bg-gray-100 text-black w-full">
//                     <div className="w-full px-4 text-center">
//                     {/* <div className="w-full px-4 text-center"> */}

//                         <h2 className="text-3xl font-bold mb-6">Search Your Movie Mood</h2>
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <input type="text" placeholder="Movie 🎥" value={movie} onChange={(e) => setMovie(e.target.value)} required className="w-full p-3 rounded-md border" />
//                             <input type="text" placeholder="Location 📍" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-3 rounded-md border" />
//                             <input type="text" placeholder="Budget (in local currency of visiting country) 💰" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full p-3 rounded-md border" />
//                             <input type="number" placeholder="Days ☀️" value={days} onChange={(e) => setDays(e.target.value)} className="w-full p-3 rounded-md border" />
//                             <input type="number" placeholder="Nights 🌙" value={nights} onChange={(e) => setNights(e.target.value)} className="w-full p-3 rounded-md border" />
//                             <button type="submit" className="bg-gradient-to-r from-purple-700 to-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-md">
//                                 {loading ? 'Generating...' : 'Generate Itinerary'}
//                             </button>
//                         </form>
//                     </div>
//                 </section>

//                 {/* Enhanced Itinerary Section - FIXED LAYOUT */}
//                 <section id="itinerary" className="py-20 bg-gradient-to-b from-white to-blue-50 text-black w-full">
//                     <div className="max-w-4xl mx-auto px-4 text-center">
//                         <h2 className="text-3xl font-extrabold text-blue-800 mb-10 tracking-wide">Your Travel Itinerary</h2>
//                         {itinerary ? (
//                             <div className="bg-white rounded-lg p-6 shadow-lg text-left">
//                                 <ReactMarkdown
//                                     components={{
//                                         h3: ({ node, ...props }) => <h3 className="text-2xl font-bold text-purple-700 mt-10 mb-4" {...props} />,
//                                         p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
//                                         table: ({ node, ...props }) => <table className="table-auto border-collapse border border-gray-300 w-full my-8 shadow-md" {...props} />,
//                                         th: ({ node, ...props }) => <th className="border border-gray-300 px-4 py-2 bg-purple-200 text-black font-bold" {...props} />,
//                                         td: ({ node, ...props }) => <td className="border border-gray-300 px-4 py-2" {...props} />,
//                                         hr: () => <hr className="my-8 border-t-2 border-blue-300" />,
//                                     }}
//                                 >
//                                      {itinerary.replace(/\| *Item\/Day *\|[\s\S]*?\| *Total *\|/g, '')  // Existing line
//                                     .replace(/\|[-\s|]+\|/g, '') }
//                                 </ReactMarkdown>
//                             </div>
//                         ) : (
//                             <p className="text-gray-500 mt-6">No itinerary generated yet. Please fill out the form above.</p>
//                         )}
//                     </div>
//                 </section>
//             </main>
//         </>
//     );
// }



// // Working code with div class changes 
// import React, { useState } from 'react';
// import axios from 'axios';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm'; 

// export default function App() {
//     const [movie, setMovie] = useState('');
//     const [location, setLocation] = useState('');
//     const [budget, setBudget] = useState('');
//     const [days, setDays] = useState('');
//     const [nights, setNights] = useState('');
//     const [itinerary, setItinerary] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const response = await axios.post('https://perplexity-hackathon.onrender.com/api/itinerary/generate', {
//                 movie,
//                 location,
//                 budget,
//                 days,
//                 nights
//             });
//             setItinerary(response.data.itinerary);
//         } catch (error) {
//             console.error('Error fetching itinerary:', error);
//             alert('Failed to fetch itinerary. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             {/* Navbar */}
//             <header className="w-full bg-slate-100 shadow-md fixed top-0 left-0 z-50">
//                 <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//                     <h1 className="text-xl font-bold text-blue-700">🎬 MovieMood</h1>
//                     <nav className="space-x-6">
//                         <a href="#home" className="text-blue-700 hover:text-blue-500 font-medium">Home</a>
//                         <a href="#features" className="text-blue-700 hover:text-blue-500 font-medium">Features</a>
//                         <a href="#search" className="text-blue-700 hover:text-blue-500 font-medium">Plan Trip</a>
//                         <a href="#itinerary" className="text-blue-700 hover:text-blue-500 font-medium">Itinerary</a>
//                     </nav>
//                 </div>
//             </header>

//             <main className="pt-[72px] font-sans text-black w-full overflow-hidden">
//                 {/* Hero Section */}
//                 <section id="home" className="relative w-full h-screen">
//                     <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
//                         <source src="/assests/hero5.mp4" type="video/mp4" />
//                         Your browser does not support the video tag.
//                     </video>
//                     <div className="relative z-10 w-full h-full flex justify-center items-center">
//                         <h2 className="text-white text-4xl font-extrabold">Lights Camera... Vacation</h2>
//                     </div>
//                 </section>

//                 {/* Features Section */}
//                 <section id="features" className="py-20 bg-black text-white">
//                     <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full px-4 md:px-16">

//                         {[{
//                             video: 'feature1.mp4',
//                             title: 'AI-Powered Trips',
//                             desc: 'Let AI craft unique, personalized travel itineraries based on the plot, theme, and vibe of your favorite movies.'
//                         }, {
//                             video: 'feature2.mp4',
//                             title: 'Movie Matching',
//                             desc: 'Automatically identify and suggest real-world filming locations based on your chosen movie.'
//                         }, {
//                             video: 'feature3.mp4',
//                             title: 'Real Destinations',
//                             desc: 'Discover iconic places that appear in films and get travel-ready routes to visit them in person.'
//                         }, {
//                             video: 'feature4.mp4',
//                             title: 'Instant Planning',
//                             desc: 'Generate full trip plans in seconds with live API-powered insights from Perplexity Sonar.'
//                         }].map((feature, idx) => (
//                             <div key={idx} className="flex flex-col items-center">
//                                 <video autoPlay loop muted playsInline className="rounded-xl shadow-lg w-full h-64 object-cover mb-4">
//                                     <source src={`/assests/videos/${feature.video}`} type="video/mp4" />
//                                 </video>
//                                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                                 <p className="text-center text-gray-300 max-w-sm">{feature.desc}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* Search Section */}
//                 <section id="search" className="py-20 bg-gray-100 text-black w-full">
//                     <div className="w-full px-4 text-center">
//                     {/* <div className="w-full px-4 text-center"> */}

//                         <h2 className="text-3xl font-bold mb-6">Search Your Movie Mood</h2>
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <input type="text" placeholder="Movie 🎥" value={movie} onChange={(e) => setMovie(e.target.value)} required className="w-full p-3 rounded-md border" />
//                             <input type="text" placeholder="Location 📍" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-3 rounded-md border" />
//                             <input type="text" placeholder="Budget (in local currency of visiting country) 💰" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full p-3 rounded-md border" />
//                             <input type="number" placeholder="Days ☀️" value={days} onChange={(e) => setDays(e.target.value)} className="w-full p-3 rounded-md border" />
//                             <input type="number" placeholder="Nights 🌙" value={nights} onChange={(e) => setNights(e.target.value)} className="w-full p-3 rounded-md border" />
//                             <button type="submit" className="bg-gradient-to-r from-purple-700 to-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-md">
//                                 {loading ? 'Generating...' : 'Generate Itinerary'}
//                             </button>
//                         </form>
//                     </div>
//                 </section>

//                 {/* Enhanced Itinerary Section */}
//                 <section id="itinerary" className="py-20 bg-gradient-to-b from-white to-blue-50 text-black w-full">
//                     <div className="max-w-4xl mx-auto px-4 text-center">
//                         <h2 className="text-3xl font-extrabold text-blue-800 mb-10 tracking-wide">Your Travel Itinerary</h2>
//                         {itinerary ? (
//                             <div className="bg-white rounded-lg p-6 shadow-lg text-left">
//                                 <ReactMarkdown
//                                     remarkPlugins={[remarkGfm]}
//                                     components={{
//                                         h3: ({ node, ...props }) => <h3 className="text-2xl font-bold text-purple-700 mt-10 mb-4" {...props} />,
//                                         p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
//                                         table: ({ node, ...props }) => <table className="table-auto border-collapse border border-gray-300 w-full my-8 shadow-md" {...props} />,
//                                         th: ({ node, ...props }) => <th className="border border-gray-300 px-4 py-2 bg-purple-200 text-black font-bold" {...props} />,
//                                         td: ({ node, ...props }) => <td className="border border-gray-300 px-4 py-2" {...props} />,
//                                         hr: () => <hr className="my-8 border-t-2 border-blue-300" />,
//                                     }}
//                                 >
//                                     {itinerary.replace(/\| *Item\/Day *\|[\s\S]*?\| *Total *\|/g, '')}
//                                 </ReactMarkdown>
//                             </div>
//                         ) : (
//                             <p className="text-gray-500 mt-6">No itinerary generated yet. Please fill out the form above.</p>
//                         )}
//                     </div>
//                 </section>
//             </main>
//         </>
//     );
// }
