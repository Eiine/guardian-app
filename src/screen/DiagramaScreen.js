import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';

// Configurar español

// Configuración del idioma español
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthNamesShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  dayNames: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy'
};

// Activar español
LocaleConfig.defaultLocale = 'es';

const CalendarScreen = () => {
  const [markedDates, setMarkedDates] = useState({});

  const loadExcelData = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'] });
    if (result.type === 'success') {
      const fileUri = result.uri;
      const bstr = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
      const workbook = XLSX.read(bstr, { type: 'base64' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const dates = {};
      data.forEach(item => {
        dates[item.fecha] = { marked: true, dotColor: 'blue', activeOpacity: 0 };
      });

      setMarkedDates(dates);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Calendario de Guardias</Text>
      <Calendar
        markingType={'dot'}
        markedDates={markedDates}
        onDayPress={(day) => alert('Seleccionaste: ' + day.dateString)}
      />
      <Text style={styles.loadText} onPress={loadExcelData}>
        📂 Cargar Excel con eventos
      </Text>
    </ScrollView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  loadText: {
    marginTop: 20,
    fontSize: 16,
    color: '#6C5CE7',
    textAlign: 'center',
  },
});
