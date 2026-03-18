export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{{PROJECT_NAME}}</h1>
      <p style={styles.subtitle}>Built with OnexJS</p>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minHeight: '100vh',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold' as const,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666666',
    marginTop: '0.5rem',
  },
}
