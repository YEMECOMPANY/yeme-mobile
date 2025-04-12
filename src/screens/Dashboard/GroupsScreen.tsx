// src/screens/Dashboard/GroupsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  ScrollView
} from 'react-native';
import styles from '../../constants/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const GroupsView = () => {
  interface Group {
    id: number;
    name: string;
    members: { id: number; name: string }[];
    image: string;
  }
  
  const [groups, setGroups] = useState<Group[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  const contacts = [
    { id: 1, name: 'Alice Smith' },
    { id: 2, name: 'Bob Johnson' },
    { id: 3, name: 'Carol Lee' },
    { id: 4, name: 'David Kim' },
    { id: 5, name: 'Eva Brown' }
  ];

  const toggleContact = (contactId: number) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleAddGroup = () => {
    if (!newGroupName.trim() || selectedContacts.length === 0) return;

    const members = selectedContacts
      .map((id) => contacts.find((c) => c.id === id))
      .filter((m): m is { id: number; name: string } => m !== undefined);

    const newGroup = {
      id: Date.now(),
      name: newGroupName,
      members,
      image: `https://i.pravatar.cc/${Math.floor(Math.random() * 100)}`
    };
    
    const filteredMembers = members.filter((m): m is { id: number; name: string } => m !== undefined);

    if (editingGroup) {
      setGroups((prev) =>
        prev.map((g) =>
          g.id === editingGroup.id
            ? { ...g, name: newGroupName, members: filteredMembers }
            : g
        )
      );
    } else {
      setGroups((prev) => [...prev, newGroup]);
    }
    
    setNewGroupName('');
    setSelectedContacts([]);
    setEditingGroup(null);
    setModalVisible(false);
  };

  const handleEditGroup = (group: Group) => {
    setNewGroupName(group.name);
    setSelectedContacts(group.members.map((m) => m.id));
    setEditingGroup(group);
    setModalVisible(true);
  };

  const handleDeleteGroup = (groupId: number) => {
    Alert.alert('Delete Group', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setGroups((prev) => prev.filter((g) => g.id !== groupId))
      }
    ]);
  };

  const renderGroup = ({ item }: { item: Group }) => (
    <TouchableOpacity
      onPress={() => handleEditGroup(item)}
      onLongPress={() => handleDeleteGroup(item.id)}
      style={styles.groupCard}
    >
      <View style={styles.groupInfo}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View>
          <Text style={styles.groupName}>{item.name}</Text>
          <Text style={{ color: 'white' }}>{item.members.length} members</Text>
        </View>
      </View>
      <Icon name="keyboard-arrow-right" size={28} color="white" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Groups</Text>
      </View>

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGroup}
        contentContainerStyle={styles.groupList}
      />
      
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Group</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
          setNewGroupName('');
          setSelectedContacts([]);
          setEditingGroup(null);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
              {editingGroup ? 'Edit Group' : 'New Group'}
            </Text>
            <TextInput
              placeholder="Enter group name"
              style={styles.input}
              value={newGroupName}
              onChangeText={setNewGroupName}
            />
            <Text style={{ alignSelf: 'flex-start', marginBottom: 5 }}>Select Members:</Text>
            <ScrollView style={styles.contactList}>
              {contacts.map((contact) => (
                <TouchableOpacity
                  key={contact.id}
                  style={[
                    styles.contactItem,
                    selectedContacts.includes(contact.id) && styles.contactSelected
                  ]}
                  onPress={() => toggleContact(contact.id)}
                >
                  <Text style={styles.contactText}>{contact.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.modalButton} onPress={handleAddGroup}>
              <Text style={styles.modalButtonText}>{editingGroup ? 'Save Changes' : 'Create Group'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setModalVisible(false);
              setNewGroupName('');
              setSelectedContacts([]);
              setEditingGroup(null);
            }}>
              <Text style={{ color: 'red', marginTop: 10 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GroupsView;
