export const customModalStyles  = {
  content: { //내부 부분
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '500px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
    overlay: { //바깥 부분 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
    },
} as const;