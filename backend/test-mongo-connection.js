const dns = require('dns').promises;
const net = require('net');

async function testMongoDB() {
  console.log('🔍 MongoDB Connection Diagnostic\n');
  
  // Test 1: DNS Resolution
  console.log('1️⃣  Testing DNS Resolution...');
  try {
    const ips = await dns.resolve4('cluster0.tawl4zg.mongodb.net');
    console.log('   ✅ DNS resolved:', ips);
  } catch (err) {
    console.log('   ❌ DNS Resolution failed:', err.message);
    console.log('   💡 Your machine cannot resolve MongoDB Atlas domain');
  }
  
  // Test 2: DNS SRV record (what MongoDB driver uses)
  console.log('\n2️⃣  Testing SRV Records...');
  try {
    const records = await dns.resolveSrv('_mongodb._tcp.cluster0.tawl4zg.mongodb.net');
    console.log('   ✅ SRV records found:', records);
  } catch (err) {
    console.log('   ❌ SRV Resolution failed:', err.message);
    console.log('   💡 This is your connectivity issue!');
  }
  
  // Test 3: Network connectivity
  console.log('\n3️⃣  Testing Network Connectivity...');
  const socket = net.createConnection({ host: 'cluster0.tawl4zg.mongodb.net', port: 27017, timeout: 5000 });
  
  socket.on('connect', () => {
    console.log('   ✅ Can reach MongoDB servers on port 27017');
    socket.destroy();
  });
  
  socket.on('timeout', () => {
    console.log('   ⏱️  Connection timeout - possible firewall issue');
    socket.destroy();
  });
  
  socket.on('error', (err) => {
    console.log('   ❌ Cannot connect:', err.message);
    console.log('   💡 Possible causes:');
    console.log('      - Firewall blocking port 27017');
    console.log('      - ISP blocking MongoDB connections');
    console.log('      - Network connectivity issue');
  });
}

testMongoDB();
