import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import { CVProfile, CVAcademics, CVJobs, CVInternsip, CVAward, CVCourse, CVOrganization, CVSkill } from '@/app/api/generate-cv/pdf/route';

const styles = StyleSheet.create({
    page: {
      backgroundColor: '#E4E4E4',
      padding: 20
    },
    line: {
      borderBottom: '3px solid black', 
      marginVertical: 5,     
    },
    head: {
      display: "flex",
      alignItems: 'center',
      paddingVertical: 20
    },
    contingen: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center',
      paddingVertical: 5,
      fontSize: 12,
      marginBottom: 20,
    },
    openingHead: {
      fontSize: 14,
      marginBottom: 10,
      fontWeight: 'bold'
    },
    openingContent: {
      fontSize: 12,
      marginBottom: 20,
      color: 'gray',
      textAlign: 'justify'
    },
    section: {
      marginBottom: 20
    },
    sectionHead: {
      fontSize: 14,
      marginBottom: 5,
      fontWeight: 'bold',
    },
    sectionPart: {
      marginVertical: 14
    },
    sectionTitle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    sectionTitleSkill: {
      display: 'flex',
      flexDirection: 'row',
    },
    sectionContent: {
      fontSize: 12,
      textAlign: 'justify',
      fontWeight: 'ultralight',
      marginBottom: 5,
    },
    sectionContentSkill: {
      fontSize: 12,
      textAlign: 'justify',
      fontWeight: 'ultralight',
      marginBottom: 5,
      flex: 1
    },
});

export const DocumentCV = ({ profile, academics, jobs, internships, awards, courses, organizations, skills }: { profile?: CVProfile, academics?: CVAcademics[], jobs?: CVJobs[], internships?: CVInternsip[], awards?: CVAward[], courses?: CVCourse[], organizations?: CVOrganization[], skills?: CVSkill[]  }) => {  

  return (    
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.head}>
                <Text>{profile?.name}</Text>
            </View>

            <View style={styles.contingen}>
                <Text>{profile?.email}</Text>
                <Text>{profile?.no_hp}</Text>
            </View>

            <View >
                <Text style={styles.openingHead} >Profesional dan Informatif</Text>
                <Text style={styles.openingContent} >
                  Dokumen ini berfungsi sebagai gambaran menyeluruh mengenai perjalanan profesional yang telah ditempuh, mencakup pengalaman kerja, pendidikan, keterampilan, serta pencapaian yang telah diraih sepanjang karier. Dengan latar belakang yang kuat di bidang tertentu, penekanan pada sesuatu, dan komitmen untuk terus berkembang, setiap langkah yang diambil mencerminkan dedikasi untuk memberikan kontribusi yang signifikan dalam berbagai proyek dan tantangan. Tujuan dari dokumen ini adalah untuk menunjukkan potensi yang dapat dioptimalkan dalam mencapai tujuan organisasi yang lebih besar.
                </Text>
            </View>

            {
              academics && academics.length > 0 && (
                <View style={styles.section} >
                  <Text style={styles.sectionHead}>PENDIDIKAN</Text>
                  <View style={styles.line} />
                  {
                    academics.map((academic, index) => (
                      <View key={index} style={styles.sectionPart}>
                        <View style={styles.sectionTitle} >
                          <Text style={styles.sectionContent}>{academic.nama_studi}</Text>
                          <Text style={styles.sectionContent}>{academic.kota} {academic.negara}</Text>
                        </View>

                        <View style={styles.sectionTitle} >
                          <Text style={styles.sectionContent}>{academic.prodi}</Text>
                          <Text style={styles.sectionContent}>({academic.tahun_masuk} ~ {academic.tahun_lulus})</Text>
                        </View>
                        
                        <Text style={styles.sectionContent} >
                          {academic.catatan}
                        </Text>
                      </View>
                    ))
                  }
                </View>
              )
            }

            {
              jobs && jobs.length > 0 && (
                <View style={styles.section} >
                  <Text style={styles.sectionHead}>PEKERJAAN</Text>
                  <View style={styles.line} />
                  {
                    jobs.map((job, index) => (
                      <View key={index} style={styles.sectionPart}>
                        <View style={styles.sectionTitle} >
                          <Text style={styles.sectionContent}>{job.nama_job}</Text>
                          <Text style={styles.sectionContent}>{job.kota} {job.negara}</Text>
                        </View>

                        <View style={styles.sectionTitle} >
                          <Text style={styles.sectionContent}>{job.jabatan_job}</Text>
                          <Text style={styles.sectionContent}>({job.periode_masuk_job} ~ {job.periode_masuk_job})</Text>
                        </View>
                        
                        <Text style={styles.sectionContent} >
                          {job.catatan}
                        </Text>
                      </View>
                    ))
                  }
                </View>
              )
            }

            {
              internships && internships.length > 0 && (
                <View style={styles.section} >
                  <Text style={styles.sectionHead}>MAGANG</Text>
                  <View style={styles.line} />
                  {
                    internships.map((intern, index) => (
                      <View key={index} style={styles.sectionPart}>
                        <View style={styles.sectionTitle} >
                          <Text style={styles.sectionContent}>{intern.nama_intern}</Text>
                          <Text style={styles.sectionContent}>{intern.kota} {intern.negara}</Text>
                        </View>

                        <View style={styles.sectionTitle} >
                          <Text style={styles.sectionContent}>{intern.jabatan_intern}</Text>
                          <Text style={styles.sectionContent}>({intern.periode_keluar_intern} ~ {intern.periode_keluar_intern})</Text>
                        </View>
                        
                        <Text style={styles.sectionContent} >
                          {intern.catatan}
                        </Text>
                      </View>
                    ))
                  }
                </View>
              )
            }

            {
              awards && awards.length > 0 && (
                <View style={styles.section} >
                  <Text style={styles.sectionHead}>PENGHARGAAN</Text>
                  <View style={styles.line} />
                  {
                    awards.map((award, index) => (
                      <View key={index} style={styles.sectionPart}>
                        <View style={styles.sectionTitle} >
                          <Text style={styles.sectionContent}>{award.nama_award}</Text>
                          <Text style={styles.sectionContent}>{award.tingkat_award}</Text>
                        </View>

                        <View style={styles.sectionTitle} >
                          <Text style={styles.sectionContent}>{award.institusi_award}</Text>
                          <Text style={styles.sectionContent}>{award.tahun_award}</Text>
                        </View>
                        
                        <Text style={styles.sectionContent} >
                          {award.deskripsi_award}
                        </Text>
                      </View>
                    ))
                  }
                </View>
              )
            }

            {
              organizations && organizations.length > 0 && (
                <View style={styles.section} >
                  <Text style={styles.sectionHead}>ORGANISASI</Text>
                  <View style={styles.line} />
                  {
                    organizations.map((organization, index) => (
                      <View key={index} style={styles.sectionPart}>
                        <View style={styles.sectionTitle} >
                          <Text style={styles.sectionContent}>{organization.nama_org}</Text>
                          <Text style={styles.sectionContent}>{organization.kota} {organization.negara}</Text>
                        </View>

                        <View style={styles.sectionTitle} >
                          <Text style={styles.sectionContent}>{organization.jabatan_org}</Text>
                          <Text style={styles.sectionContent}>({organization.periode_masuk_org} ~ {organization.periode_keluar_org})</Text>
                        </View>
                        
                        <Text style={styles.sectionContent} >
                          {organization.catatan}
                        </Text>
                      </View>
                    ))
                  }
                </View>
              )
            }

            {
              courses && courses.length > 0 && (
                <View style={styles.section} >
                  <Text style={styles.sectionHead}>KURSUS</Text>
                  <View style={styles.line} />
                  {
                    courses.map((course, index) => (
                      <View key={index} style={styles.sectionPart}>
                        <View style={styles.sectionTitle} >
                          <Text style={styles.sectionContent}>{course.nama_course}</Text>
                          <Text style={styles.sectionContent}>{course.tingkat_course}</Text>
                        </View>

                        <View style={styles.sectionTitle} >
                          <Text style={styles.sectionContent}>{course.institusi_course}</Text>
                          <Text style={styles.sectionContent}>{course.tahun_course}</Text>
                        </View>
                        
                      </View>
                    ))
                  }
                </View>
              )
            }

            {
              skills && skills.length > 0 && (
                <View style={styles.section} >
                  <Text style={styles.sectionHead}>KEMAMPUAN</Text>
                  <View style={styles.line} />
                  {
                    skills.map((skill, index) => (
                      <View key={index} style={styles.sectionPart}>
                        <View style={styles.sectionTitleSkill} >
                          <Text style={styles.sectionContentSkill}>Keahlian</Text>
                          <Text style={styles.sectionContentSkill}>{skill.ahli_skill}</Text>
                        </View>

                        <View style={styles.sectionTitleSkill} >
                          <Text style={styles.sectionContentSkill}>Etos Kerja</Text>
                          <Text style={styles.sectionContentSkill}>{skill.etoskerja_skill}</Text>
                        </View>

                        <View style={styles.sectionTitleSkill} >
                          <Text style={styles.sectionContentSkill}>Bahasa Inggris</Text>
                          <Text style={styles.sectionContentSkill}>{skill.inggris_skill}</Text>
                        </View>

                        <View style={styles.sectionTitleSkill} >
                          <Text style={styles.sectionContentSkill}>Kepemimpinan</Text>
                          <Text style={styles.sectionContentSkill}>{skill.kepemimpinan_skill}</Text>
                        </View>

                        <View style={styles.sectionTitleSkill} >
                          <Text style={styles.sectionContentSkill}>Kerjasama</Text>
                          <Text style={styles.sectionContentSkill}>{skill.kerjasama_skill}</Text>
                        </View>

                        <View style={styles.sectionTitleSkill} >
                          <Text style={styles.sectionContentSkill}>Komunikasi</Text>
                          <Text style={styles.sectionContentSkill}>{skill.komunikasi_skill}</Text>
                        </View>

                        <View style={styles.sectionTitleSkill} >
                          <Text style={styles.sectionContentSkill}>Penegmabangan</Text>
                          <Text style={styles.sectionContentSkill}>{skill.pengembangan_skill}</Text>
                        </View>
                        
                      </View>
                    ))
                  }
                </View>
              )
            }

        </Page>
  </Document>
);
}


