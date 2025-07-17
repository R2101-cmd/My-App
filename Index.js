
import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const dummyVideos = [
    {
      id: 'tDZ4I3N0uO8',
      title: 'What is Force? | Class 9 Science',
      channel: 'Learn With BYJU’S',
      thumbnail: 'https://img.youtube.com/vi/tDZ4I3N0uO8/hqdefault.jpg',
      duration: '08:12',
      description: 'An NCERT-aligned explanation of force for class 9.',
    },
    {
      id: 'sD0NjbwqlYw',
      title: 'The Riemann Hypothesis Explained',
      channel: '3Blue1Brown',
      thumbnail: 'https://img.youtube.com/vi/sD0NjbwqlYw/hqdefault.jpg',
      duration: '15:00',
      description: 'A visual explanation of the Riemann Hypothesis...',
    },
    {
      id: 'kjBOesZCoqc',
      title: 'Linear Algebra Basics',
      channel: '3Blue1Brown',
      thumbnail: 'https://img.youtube.com/vi/kjBOesZCoqc/hqdefault.jpg',
      duration: '20:00',
      description: 'Foundations of linear algebra...',
    },
    {
      id: 'YTb1wF0c1Vo',
      title: 'Acids, Bases and Salts | Class 10 Science',
      channel: 'LearnoHub - Class 10 Science',
      thumbnail: 'https://img.youtube.com/vi/YTb1wF0c1Vo/hqdefault.jpg',
      duration: '09:45',
      description: 'Explanation of acids, bases, and salts for CBSE class 10.',
    },
    {
      id: 'nqye02H_H6I',
      title: 'Gravitation | Class 9 Physics',
      channel: 'Khan Academy',
      thumbnail: 'https://img.youtube.com/vi/nqye02H_H6I/hqdefault.jpg',
      duration: '11:30',
      description: 'Lesson on Newton’s law of gravitation.',
    },
    {
      id: 'co7uCxN7MTY',
      title: 'Atoms and Molecules - Class 9',
      channel: 'Khan Academy',
      thumbnail: 'https://img.youtube.com/vi/co7uCxN7MTY/hqdefault.jpg',
      duration: '12:50',
      description: 'Introduction to atoms and molecules.',
    },
    {
      id: 'uVUnGzTHBgM',
      title: 'Tissues - Class 9 Science',
      channel: 'ExamFear Education',
      thumbnail: 'https://img.youtube.com/vi/uVUnGzTHBgM/hqdefault.jpg',
      duration: '10:10',
      description: 'Detailed explanation of Tissues in Class 9.',
    },
    {
      id: 'K7iB3gX8bXI',
      title: 'Motion - Class 9 Science',
      channel: 'Physics Wallah Foundation',
      thumbnail: 'https://img.youtube.com/vi/K7iB3gX8bXI/hqdefault.jpg',
      duration: '13:45',
      description: 'NCERT-based motion explanation for class 9.',
    },
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setCurrentPage('video');
  };

  const HomeScreen = () => {
    const filteredVideos = dummyVideos.filter(
      (video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const topVideos = [...filteredVideos].slice(0, 5);
    const moreVideos = [...filteredVideos].slice(5);

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>🔍 Explore NCERT Videos</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search NCERT topics..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <Text style={styles.sectionTitle}>🌟 Top Picks</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {topVideos.map((video) => (
            <TouchableOpacity
              key={video.id}
              style={styles.videoCard}
              onPress={() => handleVideoClick(video)}
            >
              <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
              <Text style={styles.videoTitle}>{video.title}</Text>
              <Text style={styles.videoChannel}>{video.channel}</Text>
              <Text style={styles.videoDuration}>⏱ {video.duration}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>📚 More Videos</Text>
        {moreVideos.map((video) => (
          <TouchableOpacity
            key={video.id}
            style={styles.videoCardVertical}
            onPress={() => handleVideoClick(video)}
          >
            <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
            <View>
              <Text style={styles.videoTitle}>{video.title}</Text>
              <Text style={styles.videoChannel}>{video.channel}</Text>
              <Text style={styles.videoDuration}>⏱ {video.duration}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const VideoPlayerScreen = ({ video }) => {
    if (!video) return <Text style={styles.notFound}>No video selected.</Text>;

    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => setCurrentPage('home')} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </TouchableOpacity>
        <Text style={styles.videoTitleLarge}>{video.title}</Text>
        <WebView
          source={{ uri: `https://www.youtube.com/embed/${video.id}?autoplay=1` }}
          style={styles.webview}
          allowsFullscreenVideo
        />
        <Text style={styles.videoDescription}>{video.description}</Text>

        <Text style={styles.transcriptHeading}>📄 Transcript</Text>
        <Text style={styles.transcriptBody}>
          {video.description} This is a placeholder for the NCERT book transcript. Future updates will include
          actual text from official NCERT PDFs.
        </Text>
      </ScrollView>
    );
  };

  return currentPage === 'home' ? <HomeScreen /> : <VideoPlayerScreen video={selectedVideo} />;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#e9f5ff',
    flex: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#0077cc',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  horizontalList: {
    marginBottom: 20,
  },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 12,
    padding: 10,
    width: 250,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  videoCardVertical: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
    flexDirection: 'row',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  thumbnail: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  videoTitle: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 4,
    flexWrap: 'wrap',
    width: 120,
  },
  videoChannel: {
    fontSize: 12,
    color: '#666',
  },
  videoDuration: {
    fontSize: 12,
    color: '#888',
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#0077cc',
    fontSize: 16,
  },
  videoTitleLarge: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  webview: {
    width: '100%',
    height: 220,
    marginBottom: 16,
  },
  videoDescription: {
    fontSize: 14,
    color: '#444',
    marginBottom: 16,
  },
  transcriptHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#005a9c',
  },
  transcriptBody: {
    fontSize: 14,
    color: '#333',
    backgroundColor: '#f4faff',
    padding: 12,
    borderRadius: 8,
  },
  notFound: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
});
      
