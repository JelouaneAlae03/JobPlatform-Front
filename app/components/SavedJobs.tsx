// Mock saved jobs data - replace with actual API call
const mockSavedJobs = [
    {
        id: 1,
        title: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        location: "New York, NY",
        salary: "$120,000 - $150,000",
        type: "Full-time",
        posted: "2 days ago",
        description: "We're looking for a Senior Software Engineer to join our team and help build scalable applications...",
        requirements: ["5+ years of experience", "React/Node.js", "AWS", "Microservices"],
        savedDate: "2024-03-15"
    },
    {
        id: 2,
        title: "Frontend Developer",
        company: "Digital Innovations",
        location: "Remote",
        salary: "$90,000 - $110,000",
        type: "Full-time",
        posted: "1 day ago",
        description: "Join our team as a Frontend Developer and work on cutting-edge web applications...",
        requirements: ["3+ years of experience", "React", "TypeScript", "CSS/SCSS"],
        savedDate: "2024-03-14"
    },
    {
        id: 3,
        title: "Full Stack Developer",
        company: "StartUp Vision",
        location: "San Francisco, CA",
        salary: "$100,000 - $130,000",
        type: "Full-time",
        posted: "3 days ago",
        description: "Exciting opportunity for a Full Stack Developer to work on innovative projects...",
        requirements: ["4+ years of experience", "JavaScript", "Python", "SQL"],
        savedDate: "2024-03-13"
    }
];

export default function SavedJobs() {
    return (
        <>
            {/* Header Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-blue-100">
                <h2 className="text-xl font-semibold text-blue-900">Saved Jobs</h2>
                <p className="text-blue-600 mt-1">Your bookmarked job opportunities</p>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-blue-100">
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search saved jobs..."
                        className="flex-1 px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                        Search
                    </button>
                </div>
            </div>

            {/* Saved Jobs List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockSavedJobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-blue-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-semibold text-blue-900">{job.title}</h2>
                                <p className="text-blue-600 font-medium">{job.company}</p>
                                <div className="mt-2 flex items-center space-x-4 text-sm text-blue-600">
                                    <span>{job.location}</span>
                                    <span>•</span>
                                    <span>{job.type}</span>
                                    <span>•</span>
                                    <span>{job.posted}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-blue-900 font-medium">{job.salary}</p>
                                <p className="text-sm text-blue-600 mt-2">Saved on {job.savedDate}</p>
                            </div>
                        </div>
                        <p className="mt-4 text-blue-800 line-clamp-2">{job.description}</p>
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-blue-900">Requirements:</h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {job.requirements.map((req, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                    >
                                        {req}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                                Apply Now
                            </button>
                            <button className="bg-white text-blue-600 px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
} 