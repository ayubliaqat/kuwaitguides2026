export default function Brand() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '28px',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: '#0071e3',
        }}
      >
        Maria's
      </div>

      <div
        style={{
          fontSize: '14px',
          fontWeight: 400,
          color: '#6E6E73',
        }}
      >
        Content Management
      </div>
    </div>
  )
}
