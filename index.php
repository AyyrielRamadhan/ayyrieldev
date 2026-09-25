<?php
$pageTitle = 'Beranda';
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';

$skills = fetch_all('SELECT * FROM skills ORDER BY level_skill DESC LIMIT 6');
$projects = fetch_all('SELECT * FROM projects ORDER BY tanggal_project DESC, id DESC LIMIT 3');
$totalSkills = table_count('skills');
$totalProjects = table_count('projects');
$totalCertificates = table_count('certificates');
?>

<div class="intro-loader" data-intro aria-hidden="true">
  <div class="intro-mark">MR</div>
  <p class="intro-label">Memuat Portofolio</p>
  <div class="intro-track"><span></span></div>
</div>

<main>
  <section class="hero-section">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="container hero-grid">
      <div class="hero-content">
        <div class="badge-row">
          <span class="badge">Mahasiswa Informatika</span>
          <span class="badge">Web Development</span>
          <span class="badge">Front End</span>
          <span class="badge">PHP &amp; Database</span>
        </div>
        <p class="eyebrow">Portofolio Mahasiswa Informatika</p>
        <h1>Halo, saya <span class="type-target" data-typing><?= h($profile['nama']); ?>.</span><span class="type-caret" aria-hidden="true"></span></h1>
        <p class="hero-subtitle">
          Saya adalah mahasiswa Informatika yang berfokus pada pengembangan
          website, front-end development, PHP, dan database.
        </p>
        <p>
          Saya tertarik membangun website yang rapi, responsif, mudah digunakan,
          dan memiliki struktur data yang jelas. Saat ini saya terus
          mengembangkan kemampuan melalui project kuliah, latihan mandiri, dan
          pengembangan portfolio digital.
        </p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="<?= h(base_url('projects.php')); ?>">Lihat Project</a>
          <a class="btn btn-outline" href="<?= h(base_url('contact.php')); ?>">Hubungi Saya</a>
          <a
            class="btn btn-ghost"
            href="<?= h(asset_url('uploads/cv-placeholder.pdf')); ?>"
            download>Unduh CV</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-panel">
          <div class="hero-panel-top">
            <span>Terbuka untuk Kolaborasi</span>
            <strong><?= h($profile['nama']); ?></strong>
          </div>
          <div class="hero-photo-wrap">
            <img
              class="hero-photo"
              src="https://cdn.phototourl.com/free/2026-06-20-5bcd3876-7217-4482-9f97-a8e21bdccce8.png"
              alt="Foto <?= h($profile['nama']); ?>" />
          </div>
          <div class="hero-panel-footer">
            <span>Fokus Teknologi</span>
            <strong>HTML, CSS, JavaScript, PHP, MySQL</strong>
          </div>
          <div class="hero-metrics" aria-label="Ringkasan portofolio">
            <div>
              <strong><?= max($totalProjects, count($projects)); ?>+</strong>
              <span>Project</span>
            </div>
            <div>
              <strong><?= max($totalSkills, count($skills)); ?>+</strong>
              <span>Skill</span>
            </div>
            <div>
              <strong><?= max($totalCertificates, 1); ?>+</strong>
              <span>Sertifikat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-elevated">
    <div class="container section-heading">
      <div>
        <p class="eyebrow">Kompetensi Utama</p>
        <h2>Keahlian yang Terus Dikembangkan</h2>
      </div>
      <a class="section-link" href="<?= h(base_url('skills.php')); ?>">Lihat Semua Skill</a>
    </div>
    <div class="container card-grid">
      <?php if ($skills): ?> <?php foreach ($skills as $skill): ?>
          <article class="skill-card">
            <div class="card-topline">
              <span class="card-meta"><?= h($skill['kategori']); ?></span>
              <strong><?= (int) $skill['level_skill']; ?>%</strong>
            </div>
            <h3><?= h($skill['nama_skill']); ?></h3>
            <p><?= h($skill['deskripsi']); ?></p>
            <div class="progress">
              <span style="width: <?= (int) $skill['level_skill']; ?>%"></span>
            </div>
          </article>
        <?php endforeach; ?> <?php else: ?>
        <div class="empty-state">
          <strong>Belum ada skill yang ditambahkan.</strong>
          <p>Data akan tampil setelah ditambahkan melalui dashboard admin.</p>
        </div>
      <?php endif; ?>
    </div>
  </section>

  <section class="section section-muted section-showcase">
    <div class="container section-heading">
      <div>
        <p class="eyebrow">Karya Terpilih</p>
        <h2>Project Pilihan</h2>
      </div>
      <a class="section-link" href="<?= h(base_url('projects.php')); ?>">Lihat Semua Project</a>
    </div>
    <div class="container project-grid">
      <?php if ($projects): ?> <?php foreach ($projects as $project): ?>
          <article class="project-card">
            <img
              src="<?= h(project_image_url($project['gambar'])); ?>"
              alt="<?= h($project['nama_project']); ?>" />
            <div>
              <span class="card-meta"><?= h(date('d M Y', strtotime($project['tanggal_project']))); ?></span>
              <h3><?= h($project['nama_project']); ?></h3>
              <p><?= h($project['deskripsi']); ?></p>
              <div class="tag-row">
                <?php render_badges($project['teknologi']); ?>
              </div>
            </div>
          </article>
        <?php endforeach; ?> <?php else: ?>
        <div class="empty-state">
          <strong>Belum ada project yang ditampilkan.</strong>
          <p>Data akan tampil setelah ditambahkan melalui dashboard admin.</p>
        </div>
      <?php endif; ?>
    </div>
  </section>
</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>