-- Enable RLS and all access is denied by default
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournaments2competitions ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "public can read tournaments"
ON tournaments FOR SELECT USING (true);

CREATE POLICY "public can read competitions"
ON competitions FOR SELECT USING (true);

CREATE POLICY "public can read tournaments2competitions"
ON tournaments2competitions FOR SELECT USING (true);
